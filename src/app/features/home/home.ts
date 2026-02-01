import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, viewChild } from '@angular/core';
import { UserServices } from '../../core/services/user-services';
import { User } from '../../core/model/User';
import { Modal } from 'bootstrap';


@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  users: User[] = [];
  loader: boolean = false;

  selectedUser: any = null;
  searchItem: string = '';

  constructor(private userServ: UserServices, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loader = true;
    this.userServ.getAllUser().subscribe({
      next: (res) => {
        this.users = res;
        console.log("Users loaded:", res);
        this.loader = false;
        this.cd.detectChanges(); // Manually trigger change detection
      },
      error: (err) => {
        console.log("Error loading users:", err);
        this.loader = false;
        this.cd.detectChanges(); // Manually trigger change detection
      }
    });
  }

  search(form: any) {
    // console.log(form.value.keyword)
    /**
     * convert searchterm to lowercase
     */
    const searchTerm = form.value.keyword.toLowerCase();
    this.loader = true;
    if (searchTerm.length > 0) {

      this.users = this.users.filter((row) =>

        row.name.toLowerCase().includes(searchTerm) || row.email.toLowerCase().includes(searchTerm) || row.phone.toLowerCase().includes(searchTerm)

      );
      this.loader = false;
    }

    this.cd.detectChanges();
  }

  nextClick() {
    this.userServ.nextPage();
  }
  delete(id: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userServ.deleteUser(id).subscribe({
        next: (res) => {
          console.log(res);

          this.users = this.users.filter((user) => user.id !== id);
          this.cd.detectChanges(); // Update view after delete
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }

  getUserIfon(id: number) {
    this.userServ.getUserByid(id).subscribe({
      next: (res) => {
        this.selectedUser = res;
        console.log("User loaded:", res);
        this.cd.detectChanges(); // Manually trigger change detection
      },
      error: (err) => {
        console.log("Error loading user:", err);
        this.cd.detectChanges(); // Manually trigger change detection
      }
    });
  }
  // openModal() {
  //   this.modal = new Modal(this.modalElement.nativeElement);
  //   this.modal.show();

  // }
  // closeModal() {
  //   this.modal.hide();
  // }
}
