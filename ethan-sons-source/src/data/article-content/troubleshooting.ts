import type { Article } from '../types';

export const troubleshootingArticles: Article[] = [
  {
    slug: 'why-circuit-breakers-trip',
    title: 'Why Circuit Breakers Trip and What It Actually Means',
    metaTitle: 'Why Circuit Breakers Trip | Ethan & Sons Electricians',
    metaDescription:
      'What a tripping breaker is telling you, the difference between overload, short circuit and ground fault, and when it needs an electrician.',
    excerpt:
      'A breaker that trips is doing its job. The question worth answering is why it had to.',
    published: '2025-01-14',
    topic: 'Troubleshooting',
    readingMinutes: 6,
    sections: [
      {
        heading: 'A tripping breaker is a working breaker',
        paragraphs: [
          'It helps to start here, because the instinct is usually alarm. A breaker exists to interrupt a circuit before the wiring behind the wall gets hot enough to be a problem. When it trips, the protection worked.',
          'What deserves attention is the reason. A breaker that trips once in five years after you ran a space heater and a vacuum on the same circuit is telling you something ordinary. A breaker that trips every few days is telling you something else.',
        ],
      },
      {
        heading: 'Three different causes that feel identical',
        paragraphs: [
          'From the outside, every trip looks the same — the lights go out and a handle has moved. Underneath, there are three distinct causes, and they carry different levels of concern.',
        ],
        list: [
          'Overload — the total draw on the circuit exceeded its rating. Common, usually explainable, and the least worrying of the three.',
          'Short circuit — hot and neutral made direct contact. This trips instantly and hard, often with a bang or a visible flash.',
          'Ground fault — current found a path to ground it should not have. This is the one that involves shock risk, which is why GFCI protection exists.',
        ],
      },
      {
        heading: 'How to tell which one you have',
        paragraphs: [
          'The pattern usually gives it away. If tripping happens when you switch on a particular high-draw appliance, and the circuit already had a load on it, overload is the likely answer. If it trips the instant you plug something in, suspect that appliance. If it trips with nothing obviously running, or if it happens in a bathroom, kitchen, garage or outdoors, a ground fault becomes more likely.',
          'One useful test costs nothing: unplug everything on the circuit, reset the breaker, and add things back one at a time. If the breaker holds until a specific item goes in, you have found your culprit. If it trips with nothing connected, the fault is in the wiring rather than anything plugged into it.',
        ],
      },
      {
        heading: 'When to stop resetting and call',
        paragraphs: [
          'Repeated resetting without diagnosis is the part to avoid. Each trip is information, and ignoring it means the underlying condition — a loose connection, damaged insulation, a failing appliance — carries on developing.',
          'Call promptly if the breaker will not reset at all, if it trips again immediately with nothing connected, if the panel or breaker feels warm, if there is any scorching or burning smell, or if the same circuit has started tripping without any change in what you use it for.',
        ],
      },
    ],
    relatedServices: ['tripping-breaker-repair', 'circuit-breaker-replacement', 'electrical-panel-upgrade'],
    relatedArticles: ['signs-your-panel-needs-attention', 'gfci-vs-afci-explained'],
  },
  {
    slug: 'gfci-vs-afci-explained',
    title: 'GFCI vs AFCI: Two Protections That Do Different Jobs',
    metaTitle: 'GFCI vs AFCI Protection Explained | Ethan & Sons Electricians',
    metaDescription:
      'GFCI protects people from shock, AFCI protects buildings from fire. What each one detects, where each is required, and why one cannot replace the other.',
    excerpt:
      'They look similar on a panel and they are frequently confused. They address completely different hazards.',
    published: '2025-02-03',
    topic: 'Safety',
    readingMinutes: 5,
    sections: [
      {
        heading: 'GFCI protects people',
        paragraphs: [
          'A ground-fault circuit interrupter watches the current going out on the hot conductor and the current returning on the neutral. In a healthy circuit those match. If they do not, current is leaving by some other route — and the route that matters is a person standing on a wet floor.',
          'The imbalance it responds to is very small and the response is very fast, which is the whole point. It is designed to interrupt the circuit before a shock becomes an injury. This is why GFCI protection is required in bathrooms, kitchens, garages, laundry areas, outdoors and anywhere else water and electricity share a room.',
        ],
      },
      {
        heading: 'AFCI protects buildings',
        paragraphs: [
          'An arc-fault circuit interrupter is looking for something different: the electrical signature of arcing. Arcing happens at damaged, loose or deteriorated connections — a cable pinched by a picture nail, a back-stabbed connection that has worked loose, a cord crushed under a furniture leg.',
          'Arcing generates a great deal of heat in a very small space, and inside a wall cavity that is a fire risk. AFCI devices distinguish the pattern of a dangerous arc from the harmless arcing that occurs normally when a switch operates or a motor brush turns. That distinction is the difficult part, and it is why the technology arrived later than GFCI.',
        ],
      },
      {
        heading: 'Why one cannot substitute for the other',
        paragraphs: [
          'They monitor different things. A GFCI has no view of arcing that stays within the circuit; an AFCI has no view of current leaking to ground through a person. Where both hazards are present, dual-function devices exist that provide both.',
          'This matters practically, because replacing a nuisance-tripping AFCI with a standard breaker — or a GFCI outlet with a regular one — removes a protection rather than fixing a problem. If a protective device trips repeatedly, the useful response is finding out what it is detecting.',
        ],
      },
      {
        heading: 'What this means in an older home',
        paragraphs: [
          'Requirements for both have expanded over successive code cycles. A house wired in the 1980s will have far less protection than current requirements call for, and a house wired in the 1960s may have almost none.',
          'Existing installations are generally not required to be brought up to current standards simply because the standards changed. But adding protection where it is absent is one of the more worthwhile safety improvements available in an older property, and it is usually straightforward.',
        ],
      },
    ],
    relatedServices: ['gfci-outlet-installation', 'gfci-protection', 'electrical-safety-inspection'],
    relatedArticles: ['why-circuit-breakers-trip', 'older-home-electrical-warning-signs'],
  },
  {
    slug: 'flickering-lights-causes',
    title: 'Flickering Lights: Harmless Quirk or Early Warning',
    metaTitle: 'What Causes Flickering Lights | Ethan & Sons Electricians',
    metaDescription:
      'How to tell an ordinary flicker from one that signals a loose connection or a service problem, and which patterns need prompt attention.',
    excerpt:
      'Some flickering is trivial. Some of it is the earliest visible sign of a connection generating heat.',
    published: '2025-02-19',
    topic: 'Troubleshooting',
    readingMinutes: 5,
    sections: [
      {
        heading: 'Start with what changed',
        paragraphs: [
          'If flickering began after a bulb was swapped or a dimmer was installed, the new component is the obvious suspect. LED lamps on dimmers designed for incandescent loads are the single most common explanation, and it is a compatibility issue rather than a fault.',
          'If nothing changed and the flickering simply appeared, that is a different conversation.',
        ],
      },
      {
        heading: 'The pattern tells you the scope',
        paragraphs: [
          'How far the flicker reaches is the most useful diagnostic information available to you without instruments.',
        ],
        list: [
          'One fixture only — usually the lamp, the socket, or the fixture connection.',
          'One circuit — points to a device or connection shared by that circuit.',
          'Several rooms at once — suggests something further upstream, at the panel or the service.',
          'Whole house, dimming when a large appliance starts — may indicate a service capacity issue or a loose service connection.',
        ],
      },
      {
        heading: 'Why loose connections deserve urgency',
        paragraphs: [
          'A loose connection does not conduct cleanly. Resistance appears where there should be none, and resistance under load produces heat. That heat degrades the connection further, which increases resistance again.',
          'It is a process that runs slowly and then not slowly. The visible flicker is often the only outward sign during the slow part, which is why an unexplained new flicker across multiple rooms deserves prompt attention rather than a wait-and-see approach.',
        ],
      },
      {
        heading: 'The neutral connection in particular',
        paragraphs: [
          'A loose neutral at the service is worth naming specifically because it produces a distinctive and alarming pattern: lights in one part of the house brighten while another part dims, and the effect shifts as loads change.',
          'That symptom can drive voltage above normal on part of the system, which damages connected equipment. If you see it, treat it as urgent.',
        ],
      },
    ],
    relatedServices: ['flickering-light-repair', 'electrical-repair', 'electrical-panel-upgrade'],
    relatedArticles: ['why-circuit-breakers-trip', 'signs-your-panel-needs-attention'],
  },
  {
    slug: 'outlet-not-working',
    title: 'An Outlet Stopped Working: What to Check First',
    metaTitle: 'Outlet Not Working? What to Check | Ethan & Sons Electricians',
    metaDescription:
      'The most common reasons a receptacle goes dead, what you can safely check yourself, and where the line is.',
    excerpt:
      'A surprising share of dead outlets come down to a tripped GFCI in another room entirely.',
    published: '2025-03-05',
    topic: 'Troubleshooting',
    readingMinutes: 4,
    sections: [
      {
        heading: 'Check the GFCI devices first',
        paragraphs: [
          'A single GFCI device protects everything wired downstream of it. That can include outlets in other rooms, in the garage, or outside — locations that have no obvious relationship to the dead outlet in front of you.',
          'Walk the bathrooms, kitchen, garage, laundry and exterior looking for a receptacle with a tripped button. Resetting it is often the entire fix. If it will not reset, or trips again straight away, something on that circuit needs investigating.',
        ],
      },
      {
        heading: 'Then the obvious ones',
        paragraphs: [
          'Check whether the breaker for that area has tripped — sometimes only partially, which is easy to miss. Check whether the outlet is switched, since half-switched receptacles controlled by a wall switch are common in living rooms and bedrooms. And confirm the problem is the outlet rather than what is plugged into it by trying a different device.',
        ],
      },
      {
        heading: 'What is usually behind it',
        paragraphs: [
          'When the simple checks come up empty, the cause is generally one of a short list: a failed receptacle, a loose connection at the device, or a break somewhere upstream on the circuit.',
          'Back-stabbed connections — where the conductor is pushed into a hole in the back of the device rather than looped under a screw — are a frequent culprit in homes built to a budget. They rely on a small spring contact, and decades of thermal cycling loosens them.',
        ],
      },
      {
        heading: 'Where to stop',
        paragraphs: [
          'Checking GFCIs, breakers and switches is entirely reasonable to do yourself. Opening up devices is where it stops being so, because the circuit may be energised from a direction you did not expect and testing that properly needs a meter and the habit of using it.',
          'Stop immediately and call if you find scorching, discolouration, a burning smell, or a device that is warm to the touch. Those indicate heat where there should be none.',
        ],
      },
    ],
    relatedServices: ['outlet-repair', 'gfci-outlet-installation', 'electrical-repair'],
    relatedArticles: ['gfci-vs-afci-explained', 'when-to-call-an-electrician'],
  },
  {
    slug: 'when-to-call-an-electrician',
    title: 'When an Electrical Problem Needs a Professional',
    metaTitle: 'When to Call an Electrician | Ethan & Sons Electricians',
    metaDescription:
      'A practical line between what a homeowner can reasonably check and what needs an electrician, plus the symptoms that warrant an immediate call.',
    excerpt:
      'There is a sensible line here, and it is not where most advice puts it.',
    published: '2025-03-21',
    topic: 'Safety',
    readingMinutes: 5,
    sections: [
      {
        heading: 'Reasonable to check yourself',
        paragraphs: [
          'Resetting a breaker or a GFCI, swapping a bulb, testing whether a problem follows a particular appliance, checking whether an outlet is switch-controlled — all of this is ordinary household troubleshooting and it genuinely helps. Half of a diagnosis is knowing what has already been ruled out.',
        ],
      },
      {
        heading: 'Call the same day for these',
        paragraphs: [
          'Some symptoms indicate heat or a fault developing right now, and they are worth acting on immediately rather than adding to a list.',
        ],
        list: [
          'A burning smell near an outlet, switch or panel',
          'Scorch marks or discolouration on a device or faceplate',
          'A device, cover plate or breaker that is warm to the touch',
          'Buzzing or crackling from a panel, outlet or switch',
          'A breaker that will not reset, or trips again immediately',
          'A shock — even a small one — from an appliance or fixture',
          'Lights across the house brightening and dimming in opposition',
        ],
      },
      {
        heading: 'Call 911 first for these',
        paragraphs: [
          'Where there is smoke, visible sparking or fire, emergency services come before an electrician. The same applies to a downed power line: stay well clear, keep others clear, and call 911 and the utility. A line on the ground can energise the ground around it, and there is no safe distance judgement to make by eye.',
        ],
      },
      {
        heading: 'Worth booking, not urgent',
        paragraphs: [
          'Then there is the category that is genuinely not an emergency but should not become permanent: a circuit that trips regularly, an outlet that has been dead for months, two-prong receptacles throughout the house, a panel with no spare capacity, or the extension cord that has been running to the same appliance since you moved in.',
          'None of these will ruin your week. All of them are the kind of thing that quietly gets worse, and all of them are cheaper to address deliberately than urgently.',
        ],
      },
    ],
    relatedServices: ['electrical-repair', 'electrical-safety-inspection', 'home-electrical-inspection'],
    relatedArticles: ['outlet-not-working', 'older-home-electrical-warning-signs'],
  },
];
