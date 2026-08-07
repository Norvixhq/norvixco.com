#!/usr/bin/env python3
"""
Content top-up.

Every service page should present a complete six-stage process and six
material/approach options, so no grid ends on an orphan and no process reads
as if it stops halfway. This adds the genuinely missing entries rather than
padding: the stages below are ones we actually perform on that service, and
the options are ones actually available for it.

Run once; it is idempotent, so re-running will not duplicate entries.
"""
import json
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FILES = ["services-roofing.json", "services-exterior.json"]

P = "process"
O = "options"

ADD = {
"roof-repair": {P: [{"t": "Follow-up check", "d": "We look at the repair again after the next real rain if you want us to, rather than assuming it held."}],
 O: [{"t": "Skylight reseal or reflash", "d": "Rebuilding the flashing kit around a skylight, which is a far more common leak source than the unit itself."},
     {"t": "Decking repair", "d": "Replacing sheathing that has already softened under a chronic leak, so the new work has something solid to sit on."}]},

"roof-inspections": {P: [{"t": "Attic review", "d": "Where there is safe access, we check for daylight, staining, insulation condition, and whether the ventilation is actually moving air."},
                         {"t": "Written estimate, only if warranted", "d": "Free and itemized if the roof needs work. If it does not, you get told that instead."}],
 O: [{"t": "Annual condition check", "d": "A yearly baseline so you have a documented history rather than a single snapshot."},
     {"t": "Insurance documentation set", "d": "Dated photographs and a written roofing scope you may share with your carrier at your discretion."}]},

"asphalt-shingle-roofing": {P: [{"t": "Deck and ventilation check", "d": "What the shingle sits on and how the attic breathes both affect which product makes sense."},
                                {"t": "Final walkthrough", "d": "Magnet sweep, debris hauled, and a review of the finished roof with you."}],
 O: [{"t": "Synthetic underlayment", "d": "Tear-resistant and far more stable underfoot than felt, and it holds up if weather arrives mid-job."},
     {"t": "Ice-and-water membrane", "d": "Self-adhering protection in the valleys and around every penetration, where the water actually concentrates."}]},

"hail-damage-roof-repair": {P: [{"t": "Collateral check", "d": "Gutters, vents, screens, and gable siding assessed as part of the same visit, since they took the same storm."}],
 O: [{"t": "Ridge and hip cap replacement", "d": "The most exposed line on the roof, and often the only part showing fracture." },
     {"t": "Soft-metal replacement", "d": "Dented gutters, downspouts, and vent housings handled alongside the roof rather than months later."}]},

"wind-damage-roof-repair": {P: [{"t": "Seal verification", "d": "We hand-test the repaired area and the courses around it, because a shingle that is down is not necessarily a shingle that is bonded."}],
 O: [{"t": "Starter course correction", "d": "Re-establishing the starter strip at eaves and rakes where uplift pressure is highest and it is most often missing."},
     {"t": "Full slope replacement", "d": "Where creasing and broken seals run across an entire elevation, replacing that slope rather than chasing individual shingles."}]},

"roof-leak-repair": {P: [{"t": "Interior follow-up", "d": "We tell you what to watch for on the ceiling over the next few weeks and what would mean calling us back."}],
 O: [{"t": "Skylight flashing rebuild", "d": "Replacing the flashing kit rather than caulking the glass, which is where these usually get patched badly."},
     {"t": "Drainage correction", "d": "Clearing or resizing gutters where the leak turns out to be water backing up over the roof edge."}]},

"storm-damage-inspections": {P: [{"t": "Collateral and interior check", "d": "Soft metals, gable siding, fencing, and any interior staining recorded alongside the roof."},
                                 {"t": "Documentation handover", "d": "Organized, dated photographs and a written roofing scope, yours to keep and use however you choose."}],
 O: [{"t": "Pre-season baseline", "d": "A documented condition record before storm season, so afterwards there is something to compare against."},
     {"t": "Real estate transaction check", "d": "Roof condition documented ahead of a sale or purchase, where it tends to move negotiations."}]},

"emergency-roof-tarping": {P: [{"t": "Follow-up scheduling", "d": "The permanent repair booked before we leave, so the temporary covering has an end date rather than becoming the plan."}],
 O: [{"t": "Debris removal", "d": "Clearing limbs and material off the roof so the covering sits flat and sheds water properly."},
     {"t": "Interior protection", "d": "Guidance on what to move, cover, or dry out while the permanent repair is scheduled."},
     {"t": "Follow-up inspection", "d": "A documented assessment once conditions allow, so the permanent scope is based on a proper look."}]},

"insurance-restoration-support": {P: [{"t": "Scope questions answered", "d": "We explain roofing terms and line items in plain language at any point, without speaking for anyone else."},
                                      {"t": "Work performed to the approved scope", "d": "If and when you decide to proceed, the roofing work is carried out to what was agreed."}],
 O: [{"t": "Dated photographic record", "d": "Organized by slope and by date, so the documentation is usable months later."},
     {"t": "Itemized roofing scope", "d": "A written description of the work broken out by component rather than a single figure."},
     {"t": "Plain-language explanation", "d": "A walkthrough of what each line actually covers, so you are not agreeing to language you cannot read."}]},

"roof-maintenance": {P: [{"t": "Debris clearing", "d": "Valleys, the uphill side of the chimney, and gutter outlets cleared while we are up there."},
                         {"t": "Photo record", "d": "A dated condition set added to your file, so next year's visit has something to compare against."}],
 O: [{"t": "Sealant and boot refresh", "d": "Replacing the rubber collars and sealant details that fail years before the shingles do."},
     {"t": "Gutter clearing", "d": "Troughs and downspouts flushed so the first heavy rain of the season goes where it should."},
     {"t": "Post-storm check", "d": "A targeted look after a specific weather event rather than a full annual review."}]},

"roof-ventilation": {P: [{"t": "Intake correction", "d": "Clearing or adding soffit intake first, because exhaust cannot work without it."},
                         {"t": "Verification", "d": "A second look at the attic once the corrections are in, to confirm air is actually moving."}],
 O: [{"t": "Soffit vent installation", "d": "Adding intake where an eave has none, which is more common than most homeowners expect."},
     {"t": "Baffle installation", "d": "Keeping insulation out of the eaves so the intake path stays open."}]},

"roof-flashing-repair": {P: [{"t": "Shingle reinstatement", "d": "The surrounding courses rebuilt over the new metal, since flashing is layered into the roof rather than laid on it."},
                             {"t": "Water test", "d": "Where the leak history warrants it, we run water at the repaired detail and watch what happens."}],
 O: [{"t": "Chimney cricket", "d": "A small saddle diverting water around the uphill side of a wide chimney, and a frequent omission on North Texas homes."},
     {"t": "Kick-out flashing", "d": "The small piece at the bottom of a roof-to-wall run that keeps water out of the wall cavity."}]},

"chimney-roof-penetration-repair": {P: [{"t": "Full penetration audit", "d": "Every boot, vent, and mount on the roof checked, not only the one that is leaking."},
                                        {"t": "Cleanup and review", "d": "Old material removed and the completed work photographed and walked through with you."}],
 O: [{"t": "Cricket installation", "d": "Diverting water around a wide chimney rather than letting it pool against the masonry."},
     {"t": "Solar and satellite mount sealing", "d": "Properly flashing attachments that were fitted by someone else and sealed with caulk."}]},

"new-construction-roofing": {P: [{"t": "Ventilation commissioning", "d": "Intake and exhaust confirmed against the finished attic volume rather than the plan set."}],
 O: [{"t": "Dry-in only", "d": "Weather protection installed at the right point in the build, with the finished roof scheduled separately."},
     {"t": "Detached structures", "d": "Garages, shops, and covered outdoor structures roofed to match the main house."},
     {"t": "Ventilation package", "d": "A balanced intake and exhaust plan specified for the finished structure rather than added afterwards."}]},

"gutter-installation": {P: [{"t": "Fascia repair where needed", "d": "Anything soft gets replaced before new gutters are hung on it, rather than after they pull loose."}],
 O: [{"t": "Downspout extensions", "d": "Carrying discharge far enough from the slab to matter in clay soil."},
     {"t": "Colour-matched finish", "d": "Selected against your fascia, trim, and brick in daylight rather than from a chart."}]},

"seamless-gutters": {P: [{"t": "Fascia check", "d": "The board the system hangs from inspected before anything is fabricated."},
                         {"t": "Water test and cleanup", "d": "Flow verified through every run and outlet before we leave the site."}],
 O: [{"t": "6-inch high-capacity runs", "d": "For large or steep roof planes that outrun a standard trough in heavy rain."},
     {"t": "Hidden hanger system", "d": "Concealed hangers at correct spacing rather than visible spikes."},
     {"t": "Corner and outlet rebuild", "d": "Replacing the joints that actually fail while keeping sound runs in place."}]},

"gutter-repair": {P: [{"t": "Fascia assessment", "d": "We check the wood behind the gutter, since a run that keeps pulling loose usually has a rot problem rather than a fastener problem."},
                      {"t": "Discharge check", "d": "Where the water ends up once it leaves the downspout, which is half of what gutters are for."}],
 O: [{"t": "Hanger replacement", "d": "New hangers at correct spacing where the originals were too far apart to begin with."},
     {"t": "Downspout resizing", "d": "Larger or additional outlets where the real problem is capacity rather than debris."}]},

"gutter-guards": {P: [{"t": "Gutter condition check", "d": "There is no sense guarding a system that needs re-hanging first, and we will say so."},
                      {"t": "Flow test", "d": "Water run through the guarded run to confirm it still carries what the roof sheds."}],
 O: [{"t": "Perforated aluminium", "d": "A middle option between coarse screens and micro-mesh, at moderate cost."},
     {"t": "Valley-area guarding only", "d": "Guarding the runs that actually collect, rather than the whole house."},
     {"t": "Scheduled clearing instead", "d": "Sometimes the honest answer. Twice-yearly clearing costs less than guarding a roof with little tree cover."}]},

"fascia-soffit-repair": {P: [{"t": "Gutter re-hang", "d": "The gutters come down to replace what they hang from, and go back up on sound material."},
                             {"t": "Paint and finish", "d": "New timber primed and finished so it does not start the same cycle again."}],
 O: [{"t": "Vented soffit panels", "d": "Restoring attic intake while the eave is open, which is the best moment to fix it."},
     {"t": "Pest entry closure", "d": "Sealing the gaps birds, wasps, and squirrels have already found."}]},

"siding-repair": {P: [{"t": "Moisture check behind the cladding", "d": "We look at what the water has been doing to the sheathing, not only at the cracked panel."},
                      {"t": "Finish and cleanup", "d": "Painting where the material needs it, and the site left clean."}],
 O: [{"t": "Trim and corner replacement", "d": "The joints where water actually gets in, rebuilt rather than resealed."},
     {"t": "Sheathing repair", "d": "Replacing board that has already taken on moisture behind the cladding."},
     {"t": "Full elevation replacement", "d": "Where damage is widespread enough that patching will always show."}]},

"siding-installation": {P: [{"t": "Sheathing repair", "d": "Anything soft behind the old cladding replaced while the wall is open."}],
 O: [{"t": "Weather barrier and flashing", "d": "The layer that actually manages water, installed properly before any cladding goes back on."},
     {"t": "Board and batten accents", "d": "Vertical detail on gables and entry elevations where it suits the house."}]},

"exterior-painting": {P: [{"t": "Rot repair", "d": "Soft trim and fascia replaced before coating, because paint does not fix wood."}],
 O: [{"t": "Garage doors", "d": "Often the largest painted surface on the front elevation and the most frequently skipped."},
     {"t": "Iron and railings", "d": "Handrails and ironwork prepared and coated to stop rust bleeding onto masonry."},
     {"t": "Caulk and seal only", "d": "Where the finish is sound and only the joints have opened up."}]},

"fence-repair": {P: [{"t": "Gate re-squaring", "d": "Frames re-braced and hardware reset, since gates are what fail first and get used daily."},
                     {"t": "Debris removal", "d": "Old posts, concrete, and offcuts hauled away rather than stacked behind the shed."}],
 O: [{"t": "Post reset in place", "d": "Where the post is sound but has worked loose, resetting rather than replacing it."},
     {"t": "Rail replacement", "d": "New rails where the pickets are fine but the structure behind them has gone."}]},

"outdoor-home-improvements": {P: [{"t": "Sequencing", "d": "Where several projects stack up, we order them so the work does not undo itself."},
                                  {"t": "Cleanup and walkthrough", "d": "Debris hauled and the finished work reviewed with you before we call it done."}],
 O: [{"t": "Deck staining and sealing", "d": "Decking, rail, steps, and skirting finished in one tone so the structure reads as one piece."},
     {"t": "Fence staining", "d": "Sealing timber before a Texas summer greys and dries it out."},
     {"t": "Post-storm exterior packages", "d": "Roof, gutters, fascia, and fencing handled together after a single weather event."}]},

"exterior-storm-damage-repair": {P: [{"t": "Documentation handover", "d": "Photographs and a written scope covering the whole exterior, not only the roof."}],
 O: [{"t": "Fascia and soffit repair", "d": "Restoring the overhang and the attic intake ventilation it carries."},
     {"t": "Vent and screen replacement", "d": "The small dented components that are easy to overlook and cheap to put right."}]},

"residential-roofing": {O: [{"t": "Ventilation correction", "d": "Balanced intake and exhaust addressed as part of the roof rather than treated as a separate trade."},
                            {"t": "Flashing and penetration package", "d": "New step, counter, and apron flashing plus fresh boots on every vent, rather than reusing what is there."}]},

"roof-replacement": {O: [{"t": "Synthetic underlayment", "d": "Across the whole deck, tear-resistant and stable underfoot if weather arrives mid-job."},
                         {"t": "Ice-and-water membrane", "d": "Self-adhering protection in valleys and around penetrations, where the volume actually concentrates."}]},

"storm-damage-roof-repair": {O: [{"t": "Exterior repair package", "d": "Gutters, fascia, soffit, gable siding, and fencing handled alongside the roof rather than months later."},
                                 {"t": "Ridge and edge rebuild", "d": "The most exposed lines on the roof, which take uplift first and are routinely skipped."}]},

"fence-installation": {O: [{"t": "Steel line posts", "d": "Galvanised posts carrying timber rails and pickets, which holds up better in soil that moves."},
                           {"t": "Stain and seal", "d": "Finishing the timber before its first summer rather than after it has already greyed."}]},
}

total_p = total_o = 0
for fname in FILES:
    path = os.path.join(ROOT, "src", "content", fname)
    data = json.load(open(path, encoding="utf8"))
    for svc in data:
        add = ADD.get(svc["slug"])
        if not add:
            continue
        for key, count in ((P, "t"), (O, "t")):
            for item in add.get(key, []):
                if any(x.get("t") == item["t"] for x in svc[key]):
                    continue
                svc[key].append(item)
                if key == P:
                    globals()["total_p"] = globals()["total_p"] + 1
                else:
                    globals()["total_o"] = globals()["total_o"] + 1
    json.dump(data, open(path, "w", encoding="utf8"), indent=2, ensure_ascii=False)

print(f"added {total_p} process steps and {total_o} options")

short = []
for fname in FILES:
    for svc in json.load(open(os.path.join(ROOT, "src", "content", fname), encoding="utf8")):
        if len(svc[P]) < 6 or len(svc[O]) < 6:
            short.append(f"{svc['slug']} (process {len(svc[P])}, options {len(svc[O])})")
print("still short of six:" if short else "every service now has 6 process steps and 6 options")
for x in short:
    print("  ", x)
