import { IMAGE, MEASUREMENTS_GENERAL, MEASUREMENTS_SPLITED, POLLOCK_3, POLLOCK_7, WEIGHT_HEIGHT } from "../keys";

export const FLOWS = [
  {
    type: "pollock_7",
    name: "Pollock 7 Dobras",
    pages: [POLLOCK_7, IMAGE, WEIGHT_HEIGHT, MEASUREMENTS_GENERAL, MEASUREMENTS_SPLITED],
    imagesIsRequired: false,
  },
  {
    type: "pollock_3",
    name: "Pollock 3 Dobras",
    pages: [POLLOCK_3, IMAGE, WEIGHT_HEIGHT, MEASUREMENTS_GENERAL, MEASUREMENTS_SPLITED],
    imagesIsRequired: false,
  },
  {
    type: "images",
    name: "Avaliação por Imagens",
    pages: [IMAGE, WEIGHT_HEIGHT, MEASUREMENTS_GENERAL, MEASUREMENTS_SPLITED],
    imagesIsRequired: true,
  }
]
