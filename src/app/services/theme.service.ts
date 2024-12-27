import { DOCUMENT } from '@angular/common';
import { inject, Injectable, signal } from '@angular/core';

export type Theme = 'light' | 'dark';
@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  constructor() {
    this.setTheme(this.getCurrentThemeFromLocalStorage());
  }
  private readonly document = inject(DOCUMENT);
  currentTheme = signal<Theme>('light');

  toggleTheme() {
    if (this.currentTheme() === 'light') {
      this.setTheme('dark');
    } else {
      this.setTheme('light');
    }
  }
  setTheme(theme: Theme) {
    this.currentTheme.set(theme);
    if (this.currentTheme() === 'dark') {
      this.document.documentElement.classList.add('dark-mode');
    } else {
      this.document.documentElement.classList.remove('dark-mode');
    }
    this.saveCurrentThemeInLocalStorage(theme);
  }

  saveCurrentThemeInLocalStorage(theme: Theme) {
    localStorage.setItem('preferred-theme', theme);
  }

  getCurrentThemeFromLocalStorage() {
    return (localStorage.getItem('preferred-theme') as Theme) ?? 'light';
  }
}
