import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  pageSize: number = 5;
  totalPages: number = 1;

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadUsers();
    
    // Correct way to access navigation state
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state;
    if (state?.['successMessage']) {
      alert(state['successMessage']);
    }
  }

  loadUsers() {
    const usersData = localStorage.getItem('users');
    if (usersData) {
      this.users = JSON.parse(usersData);
      this.filterUsers();
      this.calculatePagination();
    }
  }

  filterUsers() {
    if (!this.searchTerm) {
      this.filteredUsers = [...this.users];
    } else {
      const searchTermLower = this.searchTerm.toLowerCase();
      this.filteredUsers = this.users.filter(user =>
        (user.firstName?.toLowerCase().includes(searchTermLower) ||
         user.lastName?.toLowerCase().includes(searchTermLower) ||
         user.email?.toLowerCase().includes(searchTermLower))
      );
    }
    this.currentPage = 1; // Reset to first page when filtering
    this.calculatePagination();
  }

  calculatePagination() {
    this.totalPages = Math.ceil(this.filteredUsers.length / this.pageSize);
  }

  get paginatedUsers() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.filteredUsers.slice(startIndex, startIndex + this.pageSize);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  deleteUser(id: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.users = this.users.filter(user => user.id !== id);
      localStorage.setItem('users', JSON.stringify(this.users));
      this.loadUsers(); // Refresh the list
    }
  }
}