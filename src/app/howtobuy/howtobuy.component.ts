import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-howtobuy',
  templateUrl: './howtobuy.component.html',
  styleUrls: ['./howtobuy.component.scss']
})
export class HowtobuyComponent implements OnInit {

  constructor() { }
	showcopy: boolean;
	showcopy1: boolean;
  model: any = {};

  ngOnInit(): void {
    this.model.address = '0x1570dfB075b152311E0864D6dD387f9748B0C771';
		this.model.addressContract = '0x4cC20A024324B6c487f50Ba448999Ae29f8F6022';

  }
	copyMessage() {
		const selBox = document.createElement('textarea');
		selBox.style.position = 'fixed';
		selBox.style.left = '0';
		selBox.style.top = '0';
		selBox.style.opacity = '0';
		selBox.value = this.model.address;
		document.body.appendChild(selBox);
		selBox.focus();
		selBox.select();
		document.execCommand('copy');
		document.body.removeChild(selBox);

		this.showcopy = true;
		setTimeout(() => {
			this.showcopy = false;
		}, 2000);
	}
	copyMessageContractAddress() {
		const selBox = document.createElement('textarea');
		selBox.style.position = 'fixed';
		selBox.style.left = '0';
		selBox.style.top = '0';
		selBox.style.opacity = '0';
		selBox.value = this.model.addressContract;
		document.body.appendChild(selBox);
		selBox.focus();
		selBox.select();
		document.execCommand('copy');
		document.body.removeChild(selBox);

		this.showcopy1 = true;
		setTimeout(() => {
			this.showcopy1 = false;
		}, 2000);
	}
}
