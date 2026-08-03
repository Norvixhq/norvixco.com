import {
  ActivitySquare, AlarmSmoke, Anchor, Baby, BatteryCharging, BedDouble, BellRing,
  Briefcase, Building, Cable, Cctv, CircleDot, ClipboardCheck, CookingPot, Fan,
  GitBranch, Hammer, House, LampCeiling, Laptop, Layers, LayoutPanelLeft,
  Leaf, Lightbulb, MonitorSpeaker, Network, PanelTop, Plug, Power, Radar, RefreshCw, Router,
  Search, SearchCheck, ShieldAlert, ShieldCheck, ShieldPlus, ShowerHead,
  SlidersHorizontal, Sofa, Sparkles, SquareStack, ToggleLeft, TreePalm, Trees,
  UtensilsCrossed, Warehouse, WashingMachine, Waves, Wrench, Zap,
  type LucideIcon,
} from 'lucide-react';

const registry: Record<string, LucideIcon> = {
  ActivitySquare, AlarmSmoke, Anchor, Baby, BatteryCharging, BedDouble, BellRing,
  Briefcase, Building, Cable, Cctv, CircleDot, ClipboardCheck, CookingPot, Fan,
  GitBranch, Hammer, House, LampCeiling, Laptop, Layers, LayoutPanelLeft,
  Leaf, Lightbulb, MonitorSpeaker, Network, PanelTop, Plug, Power, Radar, RefreshCw, Router,
  Search, SearchCheck, ShieldAlert, ShieldCheck, ShieldPlus, ShowerHead,
  SlidersHorizontal, Sofa, Sparkles, SquareStack, ToggleLeft, TreePalm, Trees,
  UtensilsCrossed, Warehouse, WashingMachine, Waves, Wrench, Zap,
};

export function Icon({
  name,
  className = 'h-5 w-5',
  strokeWidth = 1.6,
}: {
  name: string;
  className?: string;
  strokeWidth?: number;
}) {
  const Cmp = registry[name] ?? CircleDot;
  return <Cmp className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
}

export default Icon;
