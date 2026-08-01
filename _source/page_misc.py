# -*- coding: utf-8 -*-
from lib import *
from content_cities import C
import os
import urllib.parse

MAPQ = urllib.parse.quote("%s, %s, %s %s" % (STREET, CITY, REGION, ZIP))


# ------------------------------------------------------------------ ABOUT
def build_about():
    url, cr = "/about/", [("Home", "/"), ("About", None)]
    title = "About Rapid Response Restoration | Locally Owned DFW Restoration"
    desc = ("Locally owned emergency restoration serving Dallas-Fort Worth. Owner AJ Alqraini. "
            "Water, fire, mold, storm damage, junk removal and renovation. Call (708) 506-8917.")
    schema = [organization(), local_business(), webpage_schema(title, desc, url), crumb_schema(cr)]

    vals = [("clock", "Answer the phone", "Every call, every hour. An emergency company that sends you to voicemail is not an emergency company."),
            ("doc", "Measure, don't guess", "Scope is set by moisture readings and thermal imaging, not by what looks bad. It is why we sometimes remove less than you expect."),
            ("users", "Explain it plainly", "You should understand what is happening in your property and why, without a technician talking past you."),
            ("award", "Finish the job", "Mitigation through rebuild, under one contract, so nothing lands in the gap between contractors.")]
    vcards = "".join('<div class="feat"><span class="feat-ico">%s</span><div><h3>%s</h3><p>%s</p></div></div>'
                     % (ico(k), t, b) for k, t, b in vals)

    html = head(title, desc, url, schema) + header() + f"""
<main id="main">
<section class="page-hero">
  <div class="wrap">
    {crumbs(cr)}
    <h1>Locally owned. Actually local.</h1>
    <p class="lede">Rapid Response Restoration is a Dallas-based emergency restoration company serving 29 cities across the Metroplex. We are not a franchise and we are not a call center &mdash; when you ring the number on this site, you reach the company that will be standing in your house.</p>
    <div class="btn-row">
      <a class="btn btn-call btn-lg pulse" href="tel:{TEL}">{ico('phone')}Call {PHONE}</a>
      <a class="btn btn-ghost btn-lg" href="/contact/">Contact our team</a>
    </div>
  </div>
</section>
{trust_strip()}

<section class="band">
  <div class="wrap article-layout">
    <article class="prose">
      <h2>Who we are</h2>
      <p>Rapid Response Restoration is owned and run by <strong>AJ Alqraini</strong>, working out of a facility at {STREET} in the Dallas Design District. We handle emergency restoration &mdash; water, fire, smoke, mold, storm and biohazard &mdash; along with the junk removal, storage and reconstruction work that a property needs afterward.</p>
      <p>The reason those things sit under one roof is not marketing. It is because the seam between them is where restoration jobs usually go wrong.</p>

      <h2>The problem we built the company around</h2>
      <p>Here is what typically happens after a water loss. A mitigation company dries the property and leaves. You are handed a list of contractors. The contractor you hire did not see what was behind the wall, is working from a scope someone else wrote, and disagrees with parts of it. Your adjuster now has two companies describing the same job differently. Meanwhile you are living in a house with open walls, waiting on a bid.</p>
      <p>We carry the whole job. Tear-out gets scoped with the rebuild in mind, one scope goes to your carrier, and there is one person to call when something is not right.</p>

      <h2>How we work</h2>
      <p>Restoration is a measurement trade wearing a construction trade's clothes. Whether a material can be saved is a question with a numerical answer, and we treat it that way &mdash; thermal imaging and moisture meters on arrival, a documented dry standard, readings logged every day, and equipment sized to a calculated load rather than to what happens to be on the truck.</p>
      <p>That matters to you in two directions. It stops materials being demolished that could have been dried, and it stops walls being closed over structures that are not actually dry. It also produces the documentation package your insurance claim needs, which is the difference between a settlement based on evidence and one based on an argument.</p>

      <h2>What we will tell you honestly</h2>
      <p>We will tell you when something can be dried in place instead of replaced, even though replacement invoices for more. We will tell you when we find mold rather than quietly expanding the scope. We will tell you whether you can stay in the house before you have made other plans, not at 9pm on the first night. And if a job is outside what we do well, we will say so and point you to someone who does it better.</p>

      <h2>Service area</h2>
      <p>We cover 29 cities across Dallas, Tarrant, Collin and Denton counties &mdash; from Fort Worth to Celina and everywhere between. Being physically inside the Metroplex is not a detail in this trade. It is the difference between equipment running in your house tonight and equipment running tomorrow.</p>
      <p><a href="/service-areas/">See every city we serve &rarr;</a></p>
    </article>
    <div class="sticky-aside">
      {aside_call()}
      {aside_services()}
    </div>
  </div>
</section>

<section class="band band-navy">
  <div class="wrap">
    <div class="sec-head"><span class="eyebrow">How we operate</span><h2>Four things we do not compromise on</h2></div>
    <div class="grid grid-2">{vcards}</div>
  </div>
</section>

<section class="band band-mist">
  <div class="wrap">
    <div class="sec-head center">
      <span class="eyebrow">Scope</span>
      <h2>What we take on, and what we don't</h2>
      <p>Being clear about the edges of what we do saves everyone time.</p>
    </div>
    <div class="split">
      <div class="panel-card">
        <span class="panel-ico">{ico('checkc')}</span>
        <h3>Work we do</h3>
        <ul class="check-list dark-check">
          <li>{ico('checkc')}<span>Water, fire, smoke, mold, storm and flood damage &mdash; mitigation through to rebuild</span></li>
          <li>{ico('checkc')}<span>Emergency board-up, tarping and structural shoring</span></li>
          <li>{ico('checkc')}<span>Biohazard and trauma remediation</span></li>
          <li>{ico('checkc')}<span>Contents pack-out, cleaning, storage and pack-back</span></li>
          <li>{ico('checkc')}<span>Junk removal, storage and moving</span></li>
          <li>{ico('checkc')}<span>Renovation and reconstruction, insurance or private</span></li>
          <li>{ico('checkc')}<span>Residential, commercial, multi-family and HOA common areas</span></li>
        </ul>
      </div>
      <div class="panel-card">
        <span class="panel-ico">{ico('doc')}</span>
        <h3>Work we refer out</h3>
        <ul class="check-list dark-check">
          <li>{ico('checkc')}<span>Insurance claim negotiation &mdash; we are not public adjusters and we do not argue coverage</span></li>
          <li>{ico('checkc')}<span>Asbestos and lead abatement, which requires separate licensing</span></li>
          <li>{ico('checkc')}<span>Specialist conservation of fine art and musical instruments</span></li>
          <li>{ico('checkc')}<span>Structural engineering assessments and stamped drawings</span></li>
          <li>{ico('checkc')}<span>Anything we would not do well &mdash; we will tell you and point you somewhere better</span></li>
        </ul>
        <p style="margin-top:.4rem">Referring work out costs us revenue. It is still the right call, and it is the reason people call us back.</p>
      </div>
    </div>
  </div>
</section>

<section class="band">
  <div class="wrap article-layout">
    <article class="prose">
      <h2>Who we work with</h2>
      <p><strong>Homeowners</strong> make up most of what we do. Usually the call comes at a bad moment, from someone who has never had a loss before and does not know what happens next. A large part of the job is explaining that clearly.</p>
      <p><strong>Landlords and property managers</strong> need documentation and speed, because a unit out of service is revenue lost and a tenant without a working bathroom is a problem that escalates. We work from unit lists and provide per-unit photographic records.</p>
      <p><strong>Business owners</strong> are usually weighing the cost of the work against the cost of being closed. We phase around trading hours where we can and work overnight where that gets the doors open sooner.</p>
      <p><strong>HOAs and multi-family communities</strong> bring the added complexity of shared structure, where one failure crosses several units and several policies. We scope by unit so each carrier receives documentation for what their policy actually covers.</p>
      <p><strong>Realtors and estate representatives</strong> generally have a deadline &mdash; a listing date, a closing, a probate timeline &mdash; and need the property presentable by a specific day rather than eventually.</p>

      <h2>How to check out any restoration company</h2>
      <p>Including this one. After a storm especially, a lot of people knock on doors in DFW who will not be here next year.</p>
      <ul>
        <li>Ask for a physical local address, and look it up</li>
        <li>Ask for current proof of general liability insurance, and check the dates</li>
        <li>Ask who is actually doing the work &mdash; employees, or subcontractors nobody has met</li>
        <li>Ask for the scope in writing before anything begins</li>
        <li>Walk away from anyone offering to waive or absorb your deductible &mdash; that is illegal in Texas and it makes you part of it</li>
        <li>Read anything described as an assignment of benefits very carefully before signing; it can transfer control of your claim</li>
      </ul>
      <p>Any company that is going to be around to honour a workmanship warranty can answer all of that in about a minute.</p>
    </article>
    <div class="sticky-aside">{aside_call()}{aside_cities()}</div>
  </div>
</section>

{cta_band()}
</main>
""" + footer()
    write("about", html)


# ------------------------------------------------------------------ CONTACT
CONTACT_FAQ = [('Do you really answer at 3am?', '<p>Yes. The number on this site rings through 24 hours a day, seven days a week, including holidays. Emergency restoration is not a business you can run on office hours &mdash; the damage does not wait until Monday, and neither does the mold clock.</p>'), ('Is the estimate really free?', '<p>Yes, and there is no obligation attached to it. We assess the property, explain what we found, and give you the scope in writing. If you decide not to proceed, or to use someone else, that is the end of it and there is no charge.</p>'), ('Can I send photos instead of having someone come out?', '<p>For non-urgent work &mdash; renovation, junk removal, storage &mdash; photos are often enough for a useful ballpark. For water, fire, mold or storm damage they are not, because the damage that matters is usually the damage you cannot see. Photos help us prepare; they do not replace moisture readings.</p>'), ('Do I have to file an insurance claim to use you?', '<p>No. Plenty of our work is paid privately, either because the loss is below the deductible or because the customer would rather not file. We will give you an honest cost range so you can make that decision with real numbers.</p>'), ('What if I am not sure whether this is an emergency?', '<p>Call and describe it. That is a free conversation and we would much rather have it than have you sit on something that is quietly getting worse. If it can wait until morning we will tell you so.</p>'), ('Do you charge for coming out at night or on a weekend?', '<p>Emergency response outside normal hours is priced differently to scheduled work, and we will be upfront about that before we dispatch. The assessment itself remains free.</p>'), ('Can you work with my insurance company directly?', '<p>On most covered losses, yes &mdash; we can bill the carrier directly and provide the documentation they need. What we do not do is negotiate your claim or argue coverage; that is licensed work and we are not public adjusters.</p>'), ('How quickly can you start?', '<p>For an active emergency, usually the same day. For scheduled work it depends on the current workload, and we will give you a real date rather than an optimistic one.</p>')]


def build_contact():
    url, cr = "/contact/", [("Home", "/"), ("Contact", None)]
    title = "Contact Rapid Response Restoration | 24/7 Emergency Line | Dallas TX"
    desc = ("Call Rapid Response Restoration 24/7 for emergency restoration in Dallas-Fort Worth, "
            "or email for a free estimate. (708) 506-8917. 4828 Topline Drive, Dallas TX 75247.")
    schema = [local_business(), organization(), webpage_schema(title, desc, url), crumb_schema(cr),
              {"@context": "https://schema.org", "@type": "ContactPage",
               "url": SITE + url, "name": title}, faq_schema(CONTACT_FAQ)]

    ready = [("map", "Property address or city", "So we know where we are going and which crew is closest."),
             ("drop", "What happened, and when", "A burst pipe an hour ago and a slow leak found last week are different jobs."),
             ("home", "Property type", "House, apartment, HOA common area, office, retail or warehouse."),
             ("shield", "Whether anyone is at risk", "Standing water near electrics, structural damage or anything involving sewage moves you up the queue."),
             ("doc", "Whether you have opened an insurance claim", "Either answer is fine &mdash; it just changes what we document first."),
             ("clock", "Whether the property is occupied", "It affects containment, equipment placement and whether you can stay tonight.")]
    ready_cards = "".join(
        '<div class="feat"><span class="feat-ico">%s</span><div><h3>%s</h3><p>%s</p></div></div>'
        % (ico(k), t, b) for k, t, b in ready)

    html = head(title, desc, url, schema) + header() + f"""
<main id="main">
<section class="page-hero">
  <div class="wrap">
    {crumbs(cr)}
    <h1>Talk to us now</h1>
    <p class="lede">Our line is answered 24 hours a day, seven days a week. If something is actively happening &mdash; water running, fire damage, a storm opening, sewage &mdash; calling is far faster than anything else on this page.</p>
    <a class="cta-phone" href="tel:{TEL}" data-cta="contact-hero">{PHONE}</a>
    <div class="btn-row" style="margin-top:1.6rem">
      <a class="btn btn-call btn-lg pulse" href="tel:{TEL}">{ico('phone')}Call Now</a>
      <a class="btn btn-ghost btn-lg" href="{MAILTO}">{ico('mail')}Email for a Free Estimate</a>
    </div>
    <p style="color:var(--water-300);font-family:var(--display);font-weight:600;margin-top:1.4rem">Available 24/7 &middot; <span data-clock>&mdash;</span></p>
  </div>
</section>
{trust_strip()}

<section class="band">
  <div class="wrap">
    <div class="sec-head center">
      <span class="eyebrow">Two ways to reach us</span>
      <h2>Which one you need depends on the clock</h2>
    </div>

    <div class="contact-split">
      <div class="contact-card is-urgent">
        <span class="contact-ico">{ico('zap')}</span>
        <span class="contact-kicker">Active emergency</span>
        <h3>Call us</h3>
        <p>For active flooding, burst pipes, fire or smoke damage, storm openings, sewage backups or any situation where the damage is still getting worse. Every minute of standing water widens the scope of the job.</p>
        <a class="num-lg" href="tel:{TEL}">{PHONE}</a>
        <a class="btn btn-call btn-block btn-lg" href="tel:{TEL}">{ico('phone')}Call {PHONE}</a>
        <p class="fine">Open 24 hours a day, seven days a week, including holidays.</p>
      </div>

      <div class="contact-card">
        <span class="contact-ico">{ico('mail')}</span>
        <span class="contact-kicker">Not urgent</span>
        <h3>Email for a free estimate</h3>
        <p>For renovation and rebuild work, junk removal, storage and moving, contents cleaning, or restoration that is not an active emergency. Attach photos if you have them &mdash; they make the estimate far more accurate.</p>
        <a class="mail-lg mail-link" href="{MAILTO}">{EMAIL_WRAP}</a>
        <a class="btn btn-outline btn-block btn-lg" href="{MAILTO}">{ico('mail')}Email for a Free Estimate</a>
        <p class="fine">Opens your own email app with the details we need already listed. Email is not monitored continuously &mdash; for anything active, please call.</p>
      </div>
    </div>
  </div>
</section>

<section class="band band-mist">
  <div class="wrap">
    <div class="sec-head center">
      <span class="eyebrow">Before you get in touch</span>
      <h2>What to have ready</h2>
      <p>None of this is required. It just means we can give you useful answers on the first call instead of the second.</p>
    </div>
    <div class="grid grid-2">{ready_cards}</div>
  </div>
</section>

<section class="band">
  <div class="wrap split">
    <div>
      <span class="eyebrow">Where we are</span>
      <h2>Based in Dallas, serving the Metroplex</h2>
      <div class="contact-details">
        <div>{ico('phone')}<div><span class="k">Phone</span><a class="big" href="tel:{TEL}">{PHONE}</a></div></div>
        <div>{ico('mail')}<div><span class="k">Email</span><a class="mail-link" href="{MAILTO}">{EMAIL_WRAP}</a></div></div>
        <div>{ico('map')}<div><span class="k">Address</span><span>{STREET}<br>{CITY}, {REGION} {ZIP}</span></div></div>
        <div>{ico('clock')}<div><span class="k">Hours</span><span>Open 24 hours a day, seven days a week</span></div></div>
        <div>{ico('building')}<div><span class="k">We serve</span><span>Residential and commercial properties across 29 cities in Dallas, Tarrant, Collin and Denton counties</span></div></div>
      </div>
      <div class="btn-row mt-2">
        <a class="btn btn-call" href="tel:{TEL}">{ico('phone')}Call Now</a>
        <a class="btn btn-outline" href="/service-areas/">See all service areas</a>
      </div>
    </div>
    <div class="map-frame">
      <iframe title="Map showing Rapid Response Restoration at {STREET}, {CITY}, Texas"
        src="https://www.google.com/maps?q={MAPQ}&amp;output=embed"
        loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
  </div>
</section>

<section class="band band-navy">
  <div class="wrap">
    <div class="sec-head center">
      <span class="eyebrow">After you call</span>
      <h2>What actually happens next</h2>
      <p>So there are no surprises in a situation that already has enough of them.</p>
    </div>
    <ol class="timeline timeline-dark">
      <li class="tl-item"><span class="tl-when">On the call</span><div class="tl-body"><h3>We work out what you are dealing with</h3><p>Where the property is, what has happened, whether anyone is at risk, and whether it is safe to stay. If there is something you should do immediately &mdash; shut off the water, kill a breaker, get out of a room &mdash; we tell you on that call.</p></div></li>
      <li class="tl-item"><span class="tl-when">Before we arrive</span><div class="tl-body"><h3>You get a realistic arrival window</h3><p>Based on your actual address and what the job needs, not a scripted number. If another company can genuinely get there sooner and the situation is urgent, we will say so.</p></div></li>
      <li class="tl-item"><span class="tl-when">On site</span><div class="tl-body"><h3>Assessment and documentation</h3><p>Thermal imaging and moisture readings where water is involved, photographs of everything before anything moves, and the source identified. This is the record your insurance claim will be built on.</p></div></li>
      <li class="tl-item"><span class="tl-when">Same visit</span><div class="tl-body"><h3>A plain explanation and a free estimate</h3><p>What we found, what it means, what it will take, and roughly how long. In writing, at no cost, with no obligation to proceed.</p></div></li>
      <li class="tl-item"><span class="tl-when">If you go ahead</span><div class="tl-body"><h3>Work starts and you get one point of contact</h3><p>The same person for the whole job, mitigation through rebuild. Nothing outside the agreed scope proceeds without your approval.</p></div></li>
    </ol>
  </div>
</section>

<section class="band">
  <div class="wrap article-layout">
    <article class="prose">
      <h2>Where we work</h2>
      <p>We cover 29 cities across Dallas, Tarrant, Collin and Denton counties, dispatched from our facility in the Dallas Design District. That includes Dallas, Fort Worth, Plano, Frisco, Irving, Arlington, McKinney, Garland, Richardson, Carrollton, Denton, Grapevine, Southlake, Flower Mound and the Mid-Cities, among others.</p>
      <p>If your city is not on our list, call anyway. The list reflects where we work regularly, not a boundary we refuse to cross, and we would rather tell you honestly whether we are the right people for your address than have you keep searching.</p>

      <h2>If you are calling on behalf of someone else</h2>
      <p>This happens often &mdash; an adult child calling about a parent's house, a property manager about a tenant, an executor about an estate. You do not need to be the policyholder to call us and ask questions, and you do not need to be at the property while we work.</p>
      <p>What we will need before work begins is authorisation from someone with authority over the property. We will tell you exactly what that means for your situation rather than leaving you to guess.</p>

      <h2>Language and accessibility</h2>
      <p>If it is easier for you to write than to speak, email works and we will reply in writing. If this website is difficult for you to use in any way, call and we will simply do the thing you were trying to do &mdash; and then fix the site.</p>
    </article>
    <div class="sticky-aside">{aside_call()}{aside_services()}</div>
  </div>
</section>

<section class="band band-mist">
  <div class="wrap wrap-narrow">
    <div class="sec-head center">
      <span class="eyebrow">Before you call</span>
      <h2>Questions we get asked first</h2>
    </div>
    {faq_block(CONTACT_FAQ)}
  </div>
</section>

{cta_band("Emergency? Call rather than email.", "A phone call reaches a person immediately. Everything else can wait until the water is off.")}
</main>
""" + footer()
    write("contact", html)


# ------------------------------------------------------------------ INSURANCE
def build_insurance():
    url, cr = "/insurance-claims/", [("Home", "/"), ("Insurance Claims", None)]
    title = "Insurance Claim Help for Restoration | Dallas-Fort Worth | Rapid Response"
    desc = ("How restoration insurance claims work in Texas: documentation, adjusters, deductibles, "
            "coverage and what to expect. Direct billing available. Call (708) 506-8917.")
    faqs = [
        ("Should I file a claim for a small loss?",
         "<p>Weigh the repair cost against your deductible and consider how a claim affects your premium history. If the likely cost is close to or below your deductible, filing may not help you. We will give you a free assessment and a realistic cost range so you can make that decision with real numbers instead of guessing.</p>"),
        ("Who chooses the restoration company?",
         "<p>You do. Carriers frequently have preferred vendor programs and they will often suggest one, but in Texas the choice of contractor is yours. A preferred vendor works within the carrier's program; you are entitled to hire whoever you want.</p>"),
        ("What is a supplement?",
         "<p>An additional claim submission for damage discovered after the original estimate &mdash; typically once walls or flooring are opened and hidden damage becomes visible. Supplements are normal on restoration jobs and they are one of the main reasons thorough documentation matters.</p>"),
        ("Do you bill my insurance directly?",
         "<p>On most covered losses, yes. That usually means your out-of-pocket cost is the deductible. We will confirm what applies to your specific claim before work begins.</p>"),
        ("What is ordinance or law coverage?",
         "<p>Coverage that pays to bring repaired areas up to current building code, even where the original construction was compliant when it was built. It comes up regularly on older DFW homes with electrical and plumbing, and it is frequently overlooked.</p>"),
        ("What if my claim is denied or underpaid?",
         "<p>Start by requesting the written reason and reviewing it against your policy language. You can request a re-inspection, and Texas homeowners have the right to engage a licensed public adjuster or an attorney. We are not public adjusters and we do not negotiate claims &mdash; what we can do is provide the complete physical documentation of the loss, which is often what the dispute actually turns on.</p>"),
    ]
    schema = [local_business(), webpage_schema(title, desc, url), crumb_schema(cr), faq_schema(faqs)]

    steps = [("Report it immediately", "Call your carrier and open the claim as soon as the property is safe. Late reporting is one of the most common reasons claims get reduced. You do not need a full assessment first."),
             ("Document before you touch anything", "Wide shots and close-ups of every affected area, plus the source if you can see it. Photograph before moving or discarding anything."),
             ("Stop further damage", "Policies include a duty to mitigate. Shut off the water, board up openings, tarp the roof. Keep receipts &mdash; these costs are usually reimbursable."),
             ("Choose your contractor", "It is your decision, not the carrier's. Verify licensing, insurance and a physical local address before signing anything."),
             ("Meet the adjuster on site", "We can be there with our documentation so the scope is agreed with the evidence in front of everyone rather than reconstructed afterward."),
             ("Track everything", "Keep a log of calls, names and dates, and every receipt including hotel, meals and additional living expenses if you have to relocate.")]
    scards = "".join('<div class="step"><span class="step-n">%d</span><h3>%s</h3><p>%s</p></div>'
                     % (i + 1, t, b) for i, (t, b) in enumerate(steps))

    html = head(title, desc, url, schema) + header() + f"""
<main id="main">
<section class="page-hero">
  <div class="wrap">
    {crumbs(cr)}
    <h1>Your claim is only as strong as its documentation</h1>
    <p class="lede">Most claim disputes are not disagreements about coverage. They are disagreements about evidence &mdash; what was wet, how wet, for how long, and what it took to fix. We capture that from the moment we arrive.</p>
    <div class="btn-row">
      <a class="btn btn-call btn-lg pulse" href="tel:{TEL}">{ico('phone')}Call {PHONE}</a>
      <a class="btn btn-ghost btn-lg" href="{MAILTO}">{ico('mail')}Email for a Free Estimate</a>
    </div>
  </div>
</section>
{trust_strip()}

<section class="band">
  <div class="wrap">
    <div class="sec-head center"><span class="eyebrow">Claim process</span><h2>Six steps, in this order</h2></div>
    <div class="process">{scards}</div>
  </div>
</section>

<section class="band band-mist">
  <div class="wrap article-layout">
    <article class="prose">
      <h2>What we provide your carrier</h2>
      <ul>
        <li>Dated photographic documentation of every affected area, taken before work begins</li>
        <li>Moisture maps showing the measured extent of water migration, including inside wall cavities</li>
        <li>Daily drying logs with material readings, temperature, humidity and equipment counts</li>
        <li>Line-item scopes in the estimating format carriers work from</li>
        <li>Itemized contents inventories with condition and disposition</li>
        <li>A complete closing package for your records at completion</li>
      </ul>

      <h2>What is usually covered &mdash; and what usually is not</h2>
      <p><strong>Typically covered:</strong> sudden and accidental water damage such as a burst pipe, failed water heater or appliance line; fire and smoke damage; damage from wind and hail; and in many cases mold that results directly from a covered event that was reported and remediated promptly.</p>
      <p><strong>Typically not covered:</strong> flooding from outside the property, which requires separate flood insurance; gradual leaks and seepage; damage attributed to deferred maintenance; and in most base policies, sewer and drain backup unless you carry that endorsement. Many Texas policies also cap mold coverage at a fixed amount regardless of actual cost.</p>
      <p>Every policy is different, and this is general information rather than advice about your specific coverage &mdash; your policy documents and your carrier are the authority on what you have.</p>

      <h2>A warning about post-storm door knockers</h2>
      <p>After every significant DFW hail event, out-of-state crews work neighborhoods within days. Some are legitimate. Be very cautious with anyone who arrives uninvited, pressures you to sign immediately, offers to waive or absorb your deductible, or asks you to sign an assignment of benefits before you have read it. <strong>Absorbing a deductible is illegal in Texas</strong> and it makes you a party to it. Ask any contractor &mdash; including us &mdash; for a physical local address and current proof of insurance before you sign.</p>
    </article>
    <div class="sticky-aside">{aside_call("Questions about your claim?", "We can walk you through what to expect and what your carrier will need, at no cost.")}{aside_services()}</div>
  </div>
</section>

<section class="band">
  <div class="wrap wrap-narrow">
    <div class="sec-head center"><span class="eyebrow">Claim FAQs</span><h2>Questions we get asked most</h2></div>
    {faq_block(faqs)}
  </div>
</section>

<section class="band band-navy">
  <div class="wrap">
    <div class="sec-head center">
      <span class="eyebrow">Glossary</span>
      <h2>Terms you will hear, in plain English</h2>
      <p>Claims run on vocabulary most people never need until the worst week of their year. None of this is advice about your specific policy &mdash; your policy documents and your carrier are the authority on what you have.</p>
    </div>
    <dl class="gloss"><div class="gloss-row"><dt>Deductible</dt><dd>The amount you pay before coverage applies. On most restoration claims it is your main out-of-pocket cost. Absorbing or waiving a customer's deductible is illegal in Texas.</dd></div><div class="gloss-row"><dt>Actual cash value (ACV)</dt><dd>Replacement cost minus depreciation for age and wear. Many policies pay ACV first and release the remainder once repairs are actually completed.</dd></div><div class="gloss-row"><dt>Replacement cost value (RCV)</dt><dd>The cost to replace without deducting depreciation. Usually an endorsement rather than a default, and worth knowing which you carry.</dd></div><div class="gloss-row"><dt>Recoverable depreciation</dt><dd>The difference between ACV and RCV, released after the work is done and documented. It is a common reason people think a claim was underpaid when it was not.</dd></div><div class="gloss-row"><dt>Supplement</dt><dd>An additional submission for damage found after the original estimate, typically once walls or flooring are opened. Normal on restoration jobs.</dd></div><div class="gloss-row"><dt>Scope of loss</dt><dd>The itemised list of what was damaged and what it takes to repair it. The document your settlement is calculated from.</dd></div><div class="gloss-row"><dt>Mitigation</dt><dd>Emergency work to stop damage getting worse &mdash; extraction, drying, board-up, tarping. Your policy generally requires you to do it.</dd></div><div class="gloss-row"><dt>Ordinance or law coverage</dt><dd>Pays to bring repairs up to current code where the original construction was compliant when built. Frequently overlooked on older DFW homes.</dd></div><div class="gloss-row"><dt>Additional living expense (ALE)</dt><dd>Reimburses the reasonable extra cost of living elsewhere while the property is uninhabitable. Keep every receipt.</dd></div><div class="gloss-row"><dt>Assignment of benefits (AOB)</dt><dd>A document transferring your claim rights to a contractor. Read it carefully; it can hand over control of your claim and your settlement.</dd></div><div class="gloss-row"><dt>Public adjuster</dt><dd>A licensed professional who negotiates claims on your behalf for a fee. We are not one, and any contractor telling you they will negotiate your claim is describing licensed work.</dd></div><div class="gloss-row"><dt>Proof of loss</dt><dd>A sworn statement of the amount claimed, which carriers may require. There are deadlines attached, so do not let one sit.</dd></div></dl>
  </div>
</section>

<section class="band">
  <div class="wrap article-layout">
    <article class="prose">
      <h2>Mistakes that cost people money</h2>
      <h3>Throwing damaged items away before photographing them</h3>
      <p>The single most expensive habit we see. An item photographed, described and listed is an item your policy can reimburse. An item already in a dumpster is one you will be asked to prove existed, months later, from memory.</p>
      <h3>Waiting to report</h3>
      <p>Late reporting is one of the most common reasons claims get reduced. You do not need a full assessment before you open the claim &mdash; report it as soon as the property is safe, then let the detail follow.</p>
      <h3>Doing nothing because you are waiting on the adjuster</h3>
      <p>Your policy requires you to prevent further damage. Waiting a week for an inspection while water sits is not neutral; it grows the loss and gives the carrier a reason to question the additional damage.</p>
      <h3>Signing on the doorstep</h3>
      <p>Nothing about a legitimate restoration job requires a signature within five minutes of meeting someone. Pressure to sign immediately is itself the warning.</p>
      <h3>Accepting a first number without a written scope</h3>
      <p>A settlement figure with no itemised scope behind it cannot be checked. Ask for the line-item scope, and compare it against what a contractor says the work actually involves.</p>
      <h3>Not asking about code upgrades</h3>
      <p>On older properties, code-driven costs are real and often covered by ordinance or law coverage. Nobody will volunteer this. Ask.</p>
    </article>
    <div class="sticky-aside">{aside_call("Questions about your claim?", "We can walk you through what to expect and what your carrier will need, at no cost.")}{aside_cities()}</div>
  </div>
</section>

{cta_band("Not sure where to start with your claim?", "Call and we will tell you what to document, what to say when you open the claim, and what happens next.")}
</main>
""" + footer()
    write("insurance-claims", html)


# ------------------------------------------------------------------ LEGAL
def legal_page(slug, title, h1, desc, body):
    url, cr = "/%s/" % slug, [("Home", "/"), (h1, None)]
    schema = [webpage_schema(title, desc, url), crumb_schema(cr), local_business()]
    html = head(title, desc, url, schema) + header() + f"""
<main id="main">
<section class="page-hero">
  <div class="wrap">{crumbs(cr)}<h1>{h1}</h1>
  <p class="lede">Last updated 28 July 2026</p></div>
</section>
<section class="band"><div class="wrap"><article class="prose">{body}</article></div></section>
{cta_band()}
</main>
""" + footer()
    write(slug, html)


def build_legal():
    legal_page("privacy-policy", "Privacy Policy | Rapid Response Restoration", "Privacy Policy",
               "How Rapid Response Restoration collects, uses and protects your information.", f"""
<h2>Who we are</h2>
<p>{NAME}, {STREET}, {CITY}, {REGION} {ZIP}. Phone {PHONE}. Email <a href="mailto:{EMAIL}">{EMAIL}</a>. This policy explains what we collect through this website and how we use it.</p>
<h2>Information we collect</h2>
<p><strong>Information you give us.</strong> When you submit a form or call us, we collect your name, phone number, email address, property address and the details you provide about your situation. We use this solely to respond to you and to provide the services you ask for.</p>
<p><strong>Information collected automatically.</strong> Like most websites, ours may record standard technical information such as IP address, browser type, device type, pages visited and referring site. This is used to understand how the site is used and to keep it working properly.</p>
<h2>How we use your information</h2>
<ul><li>To respond to enquiries and dispatch crews</li><li>To prepare estimates and provide services</li><li>To communicate with your insurance carrier when you ask us to</li><li>To keep records required for business and legal purposes</li><li>To improve the website</li></ul>
<h2>Sharing</h2>
<p>We do not sell your personal information. We share it only with people who need it to deliver your job &mdash; our technicians and subcontractors, your insurance carrier or adjuster where you have asked us to, and service providers who help us operate (for example hosting or email). We may disclose information where required by law.</p>
<h2>Cookies and analytics</h2>
<p>This site may use cookies and third-party analytics to understand traffic and improve performance. You can control cookies through your browser settings; disabling them may affect some functionality.</p>
<h2>Third-party content</h2>
<p>Pages on this site embed Google Maps. Google's own privacy policy governs any data collected through that embed.</p>
<h2>Text messages</h2>
<p>If you provide a mobile number, we may contact you by text about your job or enquiry. Message and data rates may apply. Reply STOP at any time to opt out.</p>
<h2>Security and retention</h2>
<p>We take reasonable measures to protect the information we hold, and keep it only as long as needed for the purposes above or as required by law. No method of transmission over the internet is completely secure.</p>
<h2>Your choices</h2>
<p>You may ask us what personal information we hold about you, ask us to correct it, or ask us to delete it where we are not required to keep it. Contact us at <a href="mailto:{EMAIL}">{EMAIL}</a> or {PHONE}.</p>
<h2>Children</h2>
<p>This site is not directed at children under 13 and we do not knowingly collect their information.</p>
<h2>Changes</h2>
<p>We may update this policy. The date at the top of this page shows the most recent revision.</p>
""")

    legal_page("terms", "Terms of Service | Rapid Response Restoration", "Terms of Service",
               "Terms governing use of the Rapid Response Restoration website.", f"""
<h2>Agreement</h2>
<p>By using this website you agree to these terms. If you do not agree, please do not use the site.</p>
<h2>About the information here</h2>
<p>Content on this site is general information about restoration services. It is not professional, legal, insurance or medical advice, and it does not describe the coverage in your specific insurance policy. Every property and every loss is different &mdash; nothing here substitutes for an on-site assessment of your situation.</p>
<h2>No contract until it is in writing</h2>
<p>Submitting a form or calling us does not create a contract for services. Work is performed under a separate written agreement signed by both parties, which governs scope, pricing, schedule and warranty.</p>
<h2>Estimates</h2>
<p>Estimates are based on conditions observable at the time of assessment. Restoration frequently uncovers additional damage once materials are opened, and scope and price may change accordingly. Any change will be documented and communicated before that work proceeds.</p>
<h2>Insurance</h2>
<p>We are a restoration contractor. We are not an insurance company, an insurance agent or a public adjuster, and we do not negotiate claims or guarantee any coverage outcome. Decisions about your claim are made by your carrier under your policy.</p>
<h2>Intellectual property</h2>
<p>The content, design, logo and branding on this site belong to {NAME} and may not be reproduced without permission.</p>
<h2>Third-party links</h2>
<p>This site may link to or embed third-party services. We are not responsible for their content or practices.</p>
<h2>Limitation of liability</h2>
<p>To the extent permitted by law, {NAME} is not liable for indirect or consequential damages arising from use of this website. This does not limit any rights you have under your written service agreement with us or under Texas consumer protection law.</p>
<h2>Governing law</h2>
<p>These terms are governed by the laws of the State of Texas, with venue in Dallas County.</p>
<h2>Contact</h2>
<p>{NAME}, {STREET}, {CITY}, {REGION} {ZIP}. {PHONE}. <a href="mailto:{EMAIL}">{EMAIL}</a>.</p>
""")

    legal_page("accessibility", "Accessibility Statement | Rapid Response Restoration",
               "Accessibility Statement",
               "Our commitment to keeping this website usable for everyone.", f"""
<h2>Our commitment</h2>
<p>People often reach this site during an emergency, sometimes in difficult circumstances. It should work for everyone, and we have built it with that in mind.</p>
<h2>What we have done</h2>
<ul>
<li>Semantic HTML structure with a logical heading order on every page</li>
<li>Full keyboard navigation with visible focus indicators</li>
<li>A skip link to main content on every page</li>
<li>Text and interface contrast targeting WCAG 2.1 AA</li>
<li>Descriptive alternative text on meaningful images</li>
<li>Labelled form fields and accessible accordion and slider controls</li>
<li>Support for the reduced-motion system preference</li>
<li>Responsive layouts that work at 200% zoom and on small screens</li>
<li>Click-to-call phone links throughout, so contacting us takes one action</li>
</ul>
<h2>Ongoing work</h2>
<p>Accessibility is not a one-time task and we do not claim this site is perfect. We keep testing and improving it.</p>
<h2>Problems or feedback</h2>
<p>If any part of this site is difficult to use, please tell us &mdash; call {PHONE} or email <a href="mailto:{EMAIL}">{EMAIL}</a>. We will help you directly with whatever you were trying to do, and fix the underlying issue.</p>
""")


# ------------------------------------------------------------------ 404
def build_404():
    html = head("Page not found | Rapid Response Restoration",
                "That page could not be found. Call (708) 506-8917 for 24/7 emergency restoration in Dallas-Fort Worth.",
                "/404/", [local_business()],
                extra='\n<meta name="robots" content="noindex, follow">') + header() + f"""
<main id="main">
<section class="page-hero" style="min-height:62vh;display:flex;align-items:center">
  <div class="wrap">
    <span class="eyebrow">Error 404</span>
    <h1>That page isn't here.</h1>
    <p class="lede">The link may be old or mistyped. If you have an emergency, the fastest route is the phone &mdash; we answer 24 hours a day.</p>
    <div class="btn-row">
      <a class="btn btn-call btn-lg pulse" href="tel:{TEL}">{ico('phone')}Call {PHONE}</a>
      <a class="btn btn-ghost btn-lg" href="/">Back to home</a>
    </div>
    <div class="chips mt-3">
      <a class="chip" href="/services/">All services</a>
      <a class="chip" href="/service-areas/">Service areas</a>
      <a class="chip" href="/contact/">Contact</a>
      <a class="chip" href="/insurance-claims/">Insurance claims</a>
    </div>
  </div>
</section>
</main>
""" + footer()
    with open(os.path.join(OUT, "404.html"), "w", encoding="utf-8") as f:
        f.write(html)


# ------------------------------------------------------------------ TECHNICAL
def build_technical():
    urls = [("/", "1.0", "weekly"), ("/services/", "0.9", "monthly"),
            ("/service-areas/", "0.9", "monthly"), ("/insurance-claims/", "0.8", "monthly"),
            ("/about/", "0.6", "yearly"), ("/contact/", "0.8", "monthly")]
    urls += [("/services/%s/" % s, "0.9", "monthly") for s, _ in SERVICES]
    urls += [("/service-areas/%s/" % s, "0.8", "monthly") for s, _ in CITIES]
    urls += [("/privacy-policy/", "0.3", "yearly"), ("/terms/", "0.3", "yearly"),
             ("/accessibility/", "0.3", "yearly")]

    body = "\n".join(
        "  <url><loc>%s%s</loc><lastmod>2026-07-28</lastmod>"
        "<changefreq>%s</changefreq><priority>%s</priority></url>" % (SITE, u, cf, p)
        for u, p, cf in urls)
    sitemap = ('<?xml version="1.0" encoding="UTF-8"?>\n'
               '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n%s\n</urlset>\n' % body)
    open(os.path.join(OUT, "sitemap.xml"), "w").write(sitemap)

    open(os.path.join(OUT, "robots.txt"), "w").write(f"""# {NAME} — {SITE}
User-agent: *
Allow: /

# Housekeeping
Disallow: /404.html

Sitemap: {SITE}/sitemap.xml
""")

    open(os.path.join(OUT, "site.webmanifest"), "w").write("""{
  "name": "Rapid Response Restoration",
  "short_name": "Rapid Response",
  "description": "24/7 emergency restoration in Dallas-Fort Worth",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#061229",
  "theme_color": "#061229",
  "icons": [
    { "src": "/assets/img/apple-touch-icon.png", "sizes": "180x180", "type": "image/png" }
  ]
}
""")

    # Netlify/Vercel-style clean-URL + security headers, harmless elsewhere
    open(os.path.join(OUT, "_headers"), "w").write("""/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: SAMEORIGIN
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), microphone=(), camera=()

/assets/*
  Cache-Control: public, max-age=31536000, immutable
""")

    # Apache fallback for extensionless URLs if hosted on shared hosting
    open(os.path.join(OUT, ".htaccess"), "w").write("""Options -MultiViews
RewriteEngine On

# Serve directory index for clean URLs, never expose .html
RewriteCond %{THE_REQUEST} \\s/+(.*?)\\.html[\\s?] [NC]
RewriteRule ^ /%1/ [R=301,L]

RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME}/index.html -f
RewriteRule ^(.*)$ $1/index.html [L]

ErrorDocument 404 /404.html

<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript image/svg+xml
</IfModule>
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
</IfModule>
""")


def build_all():
    build_about(); build_contact(); build_insurance()
    build_legal(); build_404(); build_technical()
    print("built: about, contact, insurance-claims, legal x3, 404, sitemap, robots, manifest")


if __name__ == "__main__":
    build_all()
