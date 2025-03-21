import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserDetails } from '../../models/user/user-details.model';
@Component({
  selector: 'app-user-table',
  standalone:true,
  imports:[FormsModule,CommonModule],
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent {


  @Input() users:UserDetails[]=[];


  filteredUsers = this.users;
  searchQuery = '';

  // Filter users based on search query
  filterUsers() {
    if (this.searchQuery === '') {
      this.filteredUsers = this.users;
    } else {
      this.filteredUsers = this.users.filter(user =>
        user.firstName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        user.lastName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }

  // Toggle user status between Active and Inactive
  toggleStatus(user: any) {
    user.status = user.status === 'Active' ? 'Inactive' : 'Active';
  }

  // Pagination methods (if needed)
  currentPage = 1;
  pageSize = 5;

  get pagedUsers() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.filteredUsers.slice(startIndex, endIndex);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < Math.ceil(this.filteredUsers.length / this.pageSize)) {
      this.currentPage++;
    }
  }
}
