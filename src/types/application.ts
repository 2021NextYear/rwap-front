export enum Theme {
  dark = 'dark',
  light = 'light',
}

export interface ApplicationState {
  theme: Theme
  setTheme: (theme: Theme) => void
}
