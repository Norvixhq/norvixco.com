#!/bin/bash
# ---------------------------------------------------------------------------
#  MyDrivingCost.com — local preview
#
#  Double-click this file to view the site on your own machine exactly as it
#  will look online. It starts a small web server in the site/ folder and
#  opens your browser at http://localhost:8811.
#
#  Why this is needed: every asset on this site is referenced by a
#  root-absolute path (/assets/css/styles.css). That is what keeps the live
#  URLs clean and extension-free, and it is what breaks if you open
#  site/index.html straight off the disk — the browser looks for the
#  stylesheet at the root of your hard drive, finds nothing, and shows you
#  bare HTML. Served over HTTP, everything resolves.
#
#  Press Control-C in this window, or just close it, to stop the server.
# ---------------------------------------------------------------------------

set -u
cd "$(dirname "$0")" || exit 1

if [ ! -f "site/index.html" ]; then
  echo "Could not find site/index.html next to this script."
  echo "Keep preview.command in the same folder as the site/ directory."
  echo
  read -r -p "Press Return to close. " _
  exit 1
fi

# --- find a free port, starting at 8811 -----------------------------------
PORT=8811
while [ "$PORT" -lt 8830 ]; do
  if ! (exec 3<>/dev/tcp/127.0.0.1/$PORT) 2>/dev/null; then break; fi
  exec 3<&- 2>/dev/null
  PORT=$((PORT + 1))
done
URL="http://localhost:$PORT"

echo
echo "  MyDrivingCost.com — local preview"
echo "  ---------------------------------"
echo "  Serving: $(pwd)/site"
echo "  Address: $URL"
echo
echo "  Leave this window open while you browse."
echo "  Press Control-C when you are finished."
echo

# --- open the browser once the server is actually listening ---------------
( for _ in 1 2 3 4 5 6 7 8 9 10; do
    if (exec 3<>/dev/tcp/127.0.0.1/$PORT) 2>/dev/null; then
      exec 3<&- 2>/dev/null
      open "$URL" 2>/dev/null || true
      break
    fi
    sleep 0.4
  done ) &

cd site || exit 1

# --- serve, using whatever this machine happens to have -------------------
# Each candidate is tried in turn. A server that dies within two seconds did
# not start, so we fall through to the next one; a server the user stops with
# Control-C has been running longer than that, so we stop too.
try_serve() {
  local started=$SECONDS
  "$@"
  if [ $((SECONDS - started)) -ge 2 ]; then exit 0; fi
  return 1
}

# Careful with python3 on macOS: /usr/bin/python3 is a stub that pops the
# Xcode installer if the command-line tools are absent. Detect that and skip.
PY=""
if command -v python3 >/dev/null 2>&1; then
  PY_PATH="$(command -v python3)"
  if [ "$(uname -s)" = "Darwin" ] && [ "$PY_PATH" = "/usr/bin/python3" ] \
     && ! xcode-select -p >/dev/null 2>&1; then
    PY=""
  else
    PY="$PY_PATH"
  fi
fi
if [ -n "$PY" ]; then
  try_serve "$PY" -m http.server "$PORT" --bind 127.0.0.1
fi

# Ruby ships with macOS, but WEBrick left the standard library in Ruby 3.0.
if command -v ruby >/dev/null 2>&1 && ruby -e 'require "webrick"' >/dev/null 2>&1; then
  try_serve ruby -run -e httpd . -p "$PORT" -b 127.0.0.1
fi

if command -v php >/dev/null 2>&1; then
  try_serve php -S "127.0.0.1:$PORT"
fi

if command -v npx >/dev/null 2>&1; then
  try_serve npx --yes serve -l "$PORT" .
fi

# --- last resort: a self-contained server in Perl, which every Mac has ----
if command -v perl >/dev/null 2>&1; then
  try_serve perl -e '
use strict; use warnings; use IO::Socket::INET; use Cwd qw(abs_path);
my $port = shift; my $root = abs_path(".");
my %MIME = (
  html=>"text/html; charset=utf-8", css=>"text/css; charset=utf-8",
  js=>"text/javascript; charset=utf-8", json=>"application/json",
  webmanifest=>"application/manifest+json", xml=>"application/xml",
  txt=>"text/plain; charset=utf-8", svg=>"image/svg+xml", png=>"image/png",
  jpg=>"image/jpeg", jpeg=>"image/jpeg", ico=>"image/x-icon",
  woff2=>"font/woff2", woff=>"font/woff", webp=>"image/webp",
);
my $srv = IO::Socket::INET->new(LocalAddr=>"127.0.0.1", LocalPort=>$port,
  Listen=>16, Reuse=>1) or die "cannot bind port $port: $!\n";
$SIG{PIPE} = "IGNORE";
while (my $c = $srv->accept) {
  my $req = <$c>;
  while (defined(my $h = <$c>)) { last if $h =~ /^\r?\n$/; }
  unless (defined $req and $req =~ m{^GET\s+(\S+)}) { close $c; next; }
  my $path = $1; $path =~ s/\?.*$//; $path =~ s/#.*$//;
  $path =~ s/%([0-9A-Fa-f]{2})/chr(hex($1))/ge;
  $path =~ s{/\.\.(?=/|$)}{}g;
  my $file = $root . $path;
  $file .= "index.html" if $file =~ m{/$};
  $file = "$file/index.html" if -d $file;
  my ($ext) = $file =~ /\.([A-Za-z0-9]+)$/;
  my $type = ($ext && $MIME{lc $ext}) ? $MIME{lc $ext} : "application/octet-stream";
  if (open my $fh, "<", $file) {
    binmode $fh; local $/; my $body = <$fh>; close $fh;
    print $c "HTTP/1.0 200 OK\r\nContent-Type: $type\r\nContent-Length: "
      . length($body) . "\r\nConnection: close\r\n\r\n";
    binmode $c; print $c $body;
  } else {
    my $body = "";
    if (open my $fh, "<", "$root/404.html") { local $/; $body = <$fh>; close $fh; }
    $body = "404 Not Found" unless length $body;
    print $c "HTTP/1.0 404 Not Found\r\nContent-Type: text/html; charset=utf-8\r\n"
      . "Content-Length: " . length($body) . "\r\nConnection: close\r\n\r\n$body";
  }
  close $c;
}
' "$PORT"
fi

echo "  No web server could be started."
echo "  This Mac has no python3, ruby, php, npx or perl available."
echo "  Open Terminal, change into the site folder and run any static server."
echo
read -r -p "Press Return to close. " _
exit 1
