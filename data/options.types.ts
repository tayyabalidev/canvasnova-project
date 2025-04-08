interface PricingModel {
  functionType: string; // Typ der Preisfunktion (z. B. "none", "linear", "polynomial")
  surcharge: number; // Aufpreis (z. B. extraCharge)
  parameters?: Record<string, number>; // Parameter für die Preisfunktion (optional)
  notNegative?: boolean;
  step?: (x: number) => number; // Schrittweise Berechnung (optional)
}

interface Dimension {
  width: number
  height: number
}

interface MaxSize {
  landscape: Dimension
  portrait: Dimension
  square: Dimension
}

export interface DetailedDescription {
  title: string
  text: string
}

export interface Selections {
  product: string
  size: string
  mounting: string
  imagecarrier: string
  stretcherframe: string
  sideappearance: string
  frame: string
  frameColor: string
  passepartoutColor: string
  passepartoutWidth: number
  acrylglass: string
  paper: string
  lamination: string
  materialfinish: string
  glass: string
  hanginghardware: string
  motifborder: string
  corners: string
}

export interface ArtworkInfos {
  orderId: string
  format: string
}

export interface Product {
  id: string; // Eindeutige Kennung des Produkts
  name: string; // Name des Produkts
  description?: string; // Beschreibung des Produkts (optional)
  category: string; // Kategorie (z. B. "acrylic", "metal")
  maxSize: MaxSize
  minSize?: Dimension;
  defaultOptions: Record<string, string>; // Standardoptionen (z. B. Rahmen, Papier)
  availableMountings?: string[];
  steps?: string[]; // Konfigurationsschritte
  framedSteps?: string[];
  detailedDescriptionKey?: string
  recursiveDescription?: string
  images: string[]
}

export interface ProductPricing {
  id: string
  category: string
  basePrices?: Record<string, Record<string, number>>; // Preise nach Größen
  basePricesReferenceProductId?: string;
}

export interface ProductCategory {
  id: string; // Eindeutige Kennung der Kategorie
  name: string; // Anzeigename der Kategorie
}

interface SizeOption {
  id: string;
  name: string;
}

export interface Size {
  landscape: SizeOption[];
  portrait: SizeOption[];
  square: SizeOption[];
}

export interface Mounting {
  id: string
  name: string
  category: string
  description: string
}

export interface ImageCarrier {
  id: string
  name: string
  detailedDescription: string
  conditions: { maxSize: MaxSize }
  stepsAfterFrame: string[]
  images: string[]
}

export interface ImageCarrierPricing {
  id: string
  pricing: Record<string, PricingModel>
}

export interface FrameCategory {
  id: string
  name: string
}

export interface Frame {
  id: string; // Eindeutige ID des Rahmens
  name: string; // Name des Rahmens
  description?: string
  category: string; // Kategorie des Rahmens (z. B. "wooden", "metal")
  conditions: Record<string, any>; // Bedingungen für die Verfügbarkeit 
  colors: string[]; // Liste kompatibler Farben (IDs aus `frameColorOptions`)
  compatibleProducts: string[]; // Liste kompatibler Produkte
  frameWidth: number; // Breite des Rahmens in cm 
  images?: string[]
}

export interface FramePricing {
  id: string
  pricing: Record<string, PricingModel>
}

export interface FrameColor {
  id: string; // Eindeutige ID der Farbe
  name: string; // Name der Farbe
  image: string; // Pfad zum Bild der Farbe
}

export interface PassePartoutColor {
  id: string
  name: string
  image: string
}

export interface PassePartoutColorPricing {
  id: string
  pricing: Record<string, PricingModel>
}

export interface PassePartoutWidth {
  id: number
  label: string
}

export interface Acrylglass {
  id: string
  name: string
  conditions: string[]
  frameConditions?: string[]
  maxSize: MaxSize
}

export interface AcrylglassPricing {
  id: string
  pricing: Record<string, PricingModel>
}

export interface Paper {
  id: string; // Eindeutige ID des Papiers
  name: string; // Name des Papiers
  category?: string
  conditions: string[]; // Bedingungen, unter denen das Papier verfügbar ist (z. B. Produkte)
  imageCarrierConditions?: string[]; // Bedingungen für Bildträger (optional)
  acrylicGlassConditions?: string[]; //Bedingungen für Acrylglass (optional)
  description: string; // Beschreibung des Papiers 
  additionalInfo?: string;
  detailedDescription?: string
  images?: string[]
}

export interface PaperPricing {
  id: string
  pricing: Record<string, PricingModel>
}

export interface Glass {
  id: string
  name: string
  description: string
  conditions: {
    productConditions: string[]
    paperConditions?: string[]
    frameCondition: string
  }
}

export interface GlassPricing {
  id: string
  pricing: Record<string, PricingModel>
}

export interface Lamination {
  id: string
  name: string
  productConditions: string[]
  paperConditions: string[]
  description: string
}

export interface LaminationPricing {
  id: string
  pricing: Record<string, PricingModel>
}

export interface MaterialFinish {
  id: string
  name: string
  conditions: string[]
  description: string
}

export interface MaterialFinishPricing {
  id: string
  pricing: Record<string, PricingModel>
}

export interface HangingHardware {
  id: string
  name: string
  conditions?: string[]
  description: string
}

export interface HangingHardwarePricing {
  id: string
  pricing: Record<string, PricingModel>
}

export interface MotifBorder {
  id: string
  name: string
  margin: number
  description: string
}

export interface MotifBorderPricing {
  id: string
  pricing: Record<string, PricingModel>
}

export interface Corner {
  id: string
  name: string
  conditions: string[]
  description: string
}

export interface StretcherFrame {
  id: string
  name: string
  description: string
  frameCondition?: string
}

export interface StretcherFramePricing {
  id: string
  pricing: Record<string, PricingModel>
}

export interface SideAppearance {
  id: string
  name: string
  description: string
}

export interface ArtworkResponse {
  watermarkedUrl: string
  finalUrl?: string
}