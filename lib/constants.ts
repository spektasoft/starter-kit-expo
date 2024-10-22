export type Theme = {
  background: string;
  border: string;
  card: string;
  notification: string;
  primary: string;
  text: string;
  secondary: string;
  secondaryText: string;
};

export const NAV_THEME: {
  light: Theme;
  dark: Theme;
} = {
  light: {
    background: 'hsl(210 20% 98.04%)', // background
    border: 'hsl(115 6% 89%)', // border
    card: 'hsl(0 0% 100%)', // card
    notification: 'hsl(12 96% 39%)', // destructive
    primary: 'hsl(243.4 75.36% 58.63%)', // primary
    text: 'hsl(224 71.43% 4.12%)', // foreground
    secondary: 'hsl(210 40% 96.08%)', // secondary
    secondaryText: 'hsl(0 0% 0%)', // secondary-foreground
  },
  dark: {
    background: 'hsl(224 71.43% 4.12%)', // background
    border: 'hsl(115 6% 11%)', // border
    card: 'hsl(240 5.88% 10%)', // card
    notification: 'hsl(12 96% 58%)', // destructive
    primary: 'hsl(234.45 89.47% 73.92%)', // primary
    text: 'hsl(115 13% 100%)', // foreground
    secondary: 'hsl(217.24 32.58% 17.45%)', // secondary
    secondaryText: 'hsl(0 0% 100%)', // secondary-foreground
  },
};
