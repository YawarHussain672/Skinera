// Mapping for Before & After images located in Images/underService
// Import each so Vite bundles them and we can reference reliably.
// Filenames observed: antiaging.jpg, botox.jpg, facial.jpg, hair GFC.jpg, hair rgrowth lazer.jpg,
// korean.jpg, pelling-deep.jpg, pigmentaion.jpg, skin-titining.jpg
// We map these to service IDs used in routes.

import antiAging from "../../Images/underService/antiaging.jpg";
import botox from "../../Images/underService/botox.jpg";
import facial from "../../Images/underService/facial.jpg";
import hairGfc from "../../Images/underService/hair GFC.jpg";
import hairRegrowthLaser from "../../Images/underService/hair rgrowth lazer.jpg";
import korean from "../../Images/underService/korean.jpg";
import deepPeel from "../../Images/underService/pelling-deep.jpg";
import pigmentation from "../../Images/underService/pigmentaion.jpg";
import skinTightening from "../../Images/underService/skin-titining.jpg";
import alopeciaareata from "../../Images/underService/alopecia-treatment.jpg";
import dermatitis from "../../Images/underService/dermatitiss.jpg";


// Re-use closest images as placeholders for services without dedicated before/after assets yet
const laserHairRemoval = skinTightening; // placeholder
const laserSkinTherapy = pigmentation; // placeholder
const mesotherapy = facial; // placeholder
const microdermabrasion = deepPeel; // placeholder

// Service ID to image mapping (keys correspond to service IDs used in menu/routes)
export const beforeAfterImages = {
  "anti-aging-solutions": antiAging,
  "botox-treatment": botox,
  facials: facial,
  "hair-prp": hairGfc, // hair PRP/GFC therapy
  "hair-gfc-therapy": hairGfc,
  regrowth: hairRegrowthLaser,
  "hair-regrowth-laser": hairRegrowthLaser,
  "korean-skin-treatment": korean,
  "deep-peelings": deepPeel,
  "chemical-peel": deepPeel,
  "pigmentation-solutions": pigmentation,
  "pigmentation-treatments": pigmentation,
  "skin-tightening": skinTightening,
  "stretch-marks": skinTightening,
  "laser-hair-removal": laserHairRemoval,
  "laser-skin-therapy": laserSkinTherapy,
  mesotherapy: mesotherapy,
  microdermabrasion: microdermabrasion,
  "alopecia-treatment": alopeciaareata,
  dermatitiss: dermatitis,
};

export function getBeforeAfterImage(id) {
  return beforeAfterImages[id];
}
