// src/types.ts

export interface CarIdentity {
  make: string;
  model: string;
  trim: string;
  year: number;
  image_url: string;
}

export interface CarSpecs {
  price_base: number;      // Must be a number!
  body_style: string;
  engine_type: string;
  zero_to_sixty: number;   // Must be a number!
  mpg_combined: number;
  cargo_space: number;
}

export interface CarFeatures {
  heated_seats: boolean;
  apple_carplay: boolean;
  autopilot: boolean;
  sunroof: boolean;
  // Add more booleans here as you expand
}

// The Master Interface
export interface Car {
  identity: CarIdentity;
  specs: CarSpecs;
  features: CarFeatures;
  blind_description: string;
  createdAt?: Date; // Optional because it's generated on submit
}