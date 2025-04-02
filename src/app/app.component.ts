import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar">
      <div class="nav-container">
        <a routerLink="/list" 
           routerLinkActive="active" 
           [routerLinkActiveOptions]="{exact: true}" 
           class="nav-link">
          User List
        </a>
        <a routerLink="/adduser" 
           routerLinkActive="active" 
           class="nav-link">
          Add User
        </a>
      </div>
    </nav>
    <router-outlet></router-outlet>
  `,
  styles: [`
    /* Modern Navbar Styles */
    .navbar {
      background: linear-gradient(135deg, #3a4a6b 0%, #1e2b4d 100%);
      padding: 1rem 2rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      position: sticky;
      top: 0;
      z-index: 1000;
    }

    .nav-container {
      display: flex;
      max-width: 1200px;
      margin: 0 auto;
      gap: 1.5rem;
    }

    .nav-link {
      color: #f0f4ff;
      text-decoration: none;
      font-weight: 500;
      font-size: 1.1rem;
      padding: 0.5rem 1rem;
      border-radius: 6px;
      transition: all 0.3s ease;
      position: relative;
      display: flex;
      align-items: center;
    }

    .nav-link:hover {
      background: rgba(255, 255, 255, 0.1);
      transform: translateY(-2px);
    }

    .nav-link.active {
      background: rgba(255, 255, 255, 0.2);
      font-weight: 600;
    }

    .nav-link.active::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 50%;
      transform: translateX(-50%);
      width: 60%;
      height: 3px;
      background: #4fc3f7;
      border-radius: 3px;
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
      .navbar {
        padding: 1rem;
      }
      .nav-container {
        gap: 0.5rem;
      }
      .nav-link {
        font-size: 1rem;
        padding: 0.5rem;
      }
    }
  `]
})
export class AppComponent {}