export type FadeInAnime =
  | "none"
  | "animate-slideInBckTop"
  | "animate-slideInBlurredTop"
  | "animate-slideInBckTop"
  | "animate-slideInEllipticTopFwd"
  | "animate-slideInEllipticBottomFwd"
  | "animate-rotateScaleUp"
  | "animate-slideBckCenter"
  | "animate-bounceInTop";

export interface Error {
  code: string;
  error: string;
  status: number;
  message: string;
  error_type: string;
  error_details: ErrorDetail[];
}

export interface ErrorDetail {
  field: string;
  message: string;
}
