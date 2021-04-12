import { Component, OnInit, NgZone, Inject } from '@angular/core';
import { MetamaskProvider } from "@0xcert/ethereum-metamask-provider";
import { async } from '@angular/core/testing';
import * as $ from 'jquery';
import { WEB3 } from './../web3';
import Web3 from 'web3';
import { SpinnerVisibilityService } from 'ng-http-loader';
//import WalletConnectProvider from "@walletconnect/web3-provider";
@Component({
  selector: 'app-buynow',
  templateUrl: './buynow.component.html',
  styleUrls: ['./buynow.component.scss']
})
export class BuynowComponent implements OnInit {
  model: any = {};
  name: string;
  filter: boolean;
  ethAddressList: any[];
  amount: number = 0;
  resapproveof: boolean;
  loading: boolean;

  constructor(private zone: NgZone, @Inject(WEB3) private web3: any, private Web3: Web3,private spinner: SpinnerVisibilityService) { }
  connected: boolean = false;
  //new
  ethBalance: any;
  ethAddress: any;

  jsonDataToken: any = [
		{
			"constant": true,
			"inputs": [
				{
					"name": "_addr",
					"type": "address"
				},
				{
					"name": "_index",
					"type": "uint256"
				}
			],
			"name": "getFreezing",
			"outputs": [
				{
					"name": "_release",
					"type": "uint64"
				},
				{
					"name": "_balance",
					"type": "uint256"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [],
			"name": "transferrable",
			"outputs": [
				{
					"name": "",
					"type": "bool"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [],
			"name": "mintingFinished",
			"outputs": [
				{
					"name": "",
					"type": "bool"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [],
			"name": "name",
			"outputs": [
				{
					"name": "",
					"type": "string"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"name": "_spender",
					"type": "address"
				},
				{
					"name": "_value",
					"type": "uint256"
				}
			],
			"name": "approve",
			"outputs": [
				{
					"name": "",
					"type": "bool"
				}
			],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"name": "_to",
					"type": "address"
				},
				{
					"name": "_amount",
					"type": "uint256"
				},
				{
					"name": "_until",
					"type": "uint64"
				}
			],
			"name": "mintAndFreeze",
			"outputs": [
				{
					"name": "",
					"type": "bool"
				}
			],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [],
			"name": "totalSupply",
			"outputs": [
				{
					"name": "",
					"type": "uint256"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"name": "_from",
					"type": "address"
				},
				{
					"name": "_to",
					"type": "address"
				},
				{
					"name": "_value",
					"type": "uint256"
				}
			],
			"name": "transferFrom",
			"outputs": [
				{
					"name": "_success",
					"type": "bool"
				}
			],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [],
			"name": "decimals",
			"outputs": [
				{
					"name": "",
					"type": "uint8"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"name": "_to",
					"type": "address"
				},
				{
					"name": "_amount",
					"type": "uint256"
				}
			],
			"name": "mint",
			"outputs": [
				{
					"name": "",
					"type": "bool"
				}
			],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [],
			"name": "releaseAll",
			"outputs": [
				{
					"name": "tokens",
					"type": "uint256"
				}
			],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"name": "_spender",
					"type": "address"
				},
				{
					"name": "_subtractedValue",
					"type": "uint256"
				}
			],
			"name": "decreaseApproval",
			"outputs": [
				{
					"name": "",
					"type": "bool"
				}
			],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [],
			"name": "releaseOnce",
			"outputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [
				{
					"name": "_owner",
					"type": "address"
				}
			],
			"name": "balanceOf",
			"outputs": [
				{
					"name": "",
					"type": "uint256"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [],
			"name": "renounceOwnership",
			"outputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [],
			"name": "__name",
			"outputs": [
				{
					"name": "",
					"type": "string"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [],
			"name": "finishMinting",
			"outputs": [
				{
					"name": "",
					"type": "bool"
				}
			],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [],
			"name": "__symbol",
			"outputs": [
				{
					"name": "",
					"type": "string"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [],
			"name": "owner",
			"outputs": [
				{
					"name": "",
					"type": "address"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [],
			"name": "__decimals",
			"outputs": [
				{
					"name": "_decimals",
					"type": "uint8"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [],
			"name": "symbol",
			"outputs": [
				{
					"name": "",
					"type": "string"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"name": "_to",
					"type": "address"
				},
				{
					"name": "_value",
					"type": "uint256"
				}
			],
			"name": "transfer",
			"outputs": [
				{
					"name": "_success",
					"type": "bool"
				}
			],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [],
			"name": "stop_mint",
			"outputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [],
			"name": "totalSupplyCheck",
			"outputs": [
				{
					"name": "",
					"type": "uint256"
				}
			],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [
				{
					"name": "_addr",
					"type": "address"
				}
			],
			"name": "freezingCount",
			"outputs": [
				{
					"name": "count",
					"type": "uint256"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"name": "_spender",
					"type": "address"
				},
				{
					"name": "_addedValue",
					"type": "uint256"
				}
			],
			"name": "increaseApproval",
			"outputs": [
				{
					"name": "",
					"type": "bool"
				}
			],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [
				{
					"name": "_owner",
					"type": "address"
				},
				{
					"name": "_spender",
					"type": "address"
				}
			],
			"name": "allowance",
			"outputs": [
				{
					"name": "",
					"type": "uint256"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [],
			"name": "__AllowTokenTransfer",
			"outputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"name": "_newOwner",
					"type": "address"
				}
			],
			"name": "transferOwnership",
			"outputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [],
			"name": "__basicTokenTransferable",
			"outputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"name": "_name",
					"type": "string"
				},
				{
					"name": "_symbol",
					"type": "string"
				}
			],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "constructor"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"name": "to",
					"type": "address"
				},
				{
					"indexed": false,
					"name": "amount",
					"type": "uint256"
				}
			],
			"name": "Mint",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [],
			"name": "MintFinished",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"name": "to",
					"type": "address"
				},
				{
					"indexed": false,
					"name": "release",
					"type": "uint64"
				},
				{
					"indexed": false,
					"name": "amount",
					"type": "uint256"
				}
			],
			"name": "Freezed",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"name": "owner",
					"type": "address"
				},
				{
					"indexed": false,
					"name": "amount",
					"type": "uint256"
				}
			],
			"name": "Released",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"name": "previousOwner",
					"type": "address"
				}
			],
			"name": "OwnershipRenounced",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"name": "previousOwner",
					"type": "address"
				},
				{
					"indexed": true,
					"name": "newOwner",
					"type": "address"
				}
			],
			"name": "OwnershipTransferred",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"name": "owner",
					"type": "address"
				},
				{
					"indexed": true,
					"name": "spender",
					"type": "address"
				},
				{
					"indexed": false,
					"name": "value",
					"type": "uint256"
				}
			],
			"name": "Approval",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"name": "from",
					"type": "address"
				},
				{
					"indexed": true,
					"name": "to",
					"type": "address"
				},
				{
					"indexed": false,
					"name": "value",
					"type": "uint256"
				}
			],
			"name": "Transfer",
			"type": "event"
		}
	];

  JsonDataSwap: any = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "beneficiary",
				"type": "address"
			},
			{
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "buyTokens",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "hasClosed",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "rate",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "weiRaised",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "isOpen",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "closingTime",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "wallet",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "isOwner",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "newClosingTime",
				"type": "uint256"
			}
		],
		"name": "extendTime",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "openingTime",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "remainingTokens",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "tokenWallet",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "token",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"payable": true,
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "purchaser",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "beneficiary",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "value",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "TokensPurchased",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "prevClosingTime",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "newClosingTime",
				"type": "uint256"
			}
		],
		"name": "TimedCrowdsaleExtended",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	}
];

  ngOnInit(): void {
  }
  async enableMetamask() {
    try {
      const provider = new MetamaskProvider();
      let boolean = await provider.isEnabled();
      if (!boolean) {
        let conn = await provider.enable();
        if (conn) {
          this.connected = true;
          alert('Connected')
        } else {
          alert('Please install metamask')
        }
        boolean = true;
      } else {
        alert("Already connected or install extension");
      }
    }
    catch (err) {
      alert(err.message);
    }



  }
  async enableMetamaskwithtoken() {
    console.log(this.model);
    var amount = this.model.val;
    try {
      const provider = new MetamaskProvider();
      let boolean = await provider.isEnabled();
      if (!boolean) {
        let conn = await provider.enable();
        if (conn) {
          this.filter = true;
          // alert('Connected')
        } else {
          alert('Please install metamask')
        }
        boolean = true;
      } else {
        alert("Already connected or install extension");
      }
    }
    catch (err) {
      alert(err.message);
    }

    this.name = 'ETHEREUM';
    // var Web3: any = Web3;





    if (typeof this.web3 !== 'undefined') {

      var w3js: any = new Web3(this.web3.currentProvider);
      var mythis = this;
      var contractAddressToken = "0xa58968A07b9fc6F53dEc772486C8309320765Ab3";
      var contractAddressSwapToken = "0x1570dfB075b152311E0864D6dD387f9748B0C771";
      w3js.eth.getAccounts(async function (err, res) {
        var tokenInst = await new w3js.eth.Contract(mythis.jsonDataToken, contractAddressToken);
       
        var balance = await tokenInst.methods.allowance(res[0], contractAddressSwapToken).call();
        console.log('sssss balance ', balance)
       
        if(mythis.amount>= w3js.utils.fromWei(balance, 'ether')){
          mythis.resapproveof = true;
          this.filter=true
        }
        else{
        
          mythis.resapproveof = false;
          mythis.filter=true
        }
        // if (res) {
        //   var tokenInst = await new w3js.eth.Contract(jsonDataToken, contractAddressToken);
        //   await tokenInst.methods.buyTokens(res[0]).send({ from: res[0], gas: '210000', gasPrice: w3js.utils.toWei('55', 'gwei'), value: w3js.utils.toWei(JSON.stringify((amount / 10000)), 'ether') });

        // } else {
        //   mythis.zone.run(() => {
        //     let obj = {

        //       address: 'Please authorise you account to view',

        //       balance: 'Please authorise you account to view'

        //     };
        //     mythis.ethAddressList.push(obj);
        //   });
        // }
      });
    } else {
      alert('Web3 Not Supported/not autorized');
    }
  }

  filterCatalogues(val) {
    console.log(val);
    this.amount = val;
    if (typeof this.web3 !== 'undefined') {

      var w3js: any = new Web3(this.web3.currentProvider);
      var mythis = this;
      var contractAddressToken = "0xa58968A07b9fc6F53dEc772486C8309320765Ab3";
      var contractAddressSwapToken = "0x1570dfB075b152311E0864D6dD387f9748B0C771";
      w3js.eth.getAccounts(async function (err, res) {
        var tokenInst = await new w3js.eth.Contract(mythis.jsonDataToken, contractAddressToken);
        console.log("res", res[0]);
        console.log("add", contractAddressSwapToken);
        var balance = await tokenInst.methods.allowance(res[0], contractAddressSwapToken).call();
        console.log('sssss balance ', w3js.utils.fromWei(balance, 'ether'));
        if(mythis.amount>= w3js.utils.fromWei(balance, 'ether')){
          
          mythis.resapproveof = false;
        }
        else{
          mythis.resapproveof = true;
        }

      });
    } else {
      alert('Web3 Not Supported/not autorized');
    }


  }

  approve() {
    this.loading = true;
    this.spinner.show();
    if (typeof this.web3 !== 'undefined') {

      var w3js: any = new Web3(this.web3.currentProvider);
      var mythis = this;
      var contractAddressToken = "0xa58968A07b9fc6F53dEc772486C8309320765Ab3";
      var contractAddressSwapToken = "0x1570dfB075b152311E0864D6dD387f9748B0C771";
      w3js.eth.getAccounts(async function (err, res) {
        var tokenInst = await new w3js.eth.Contract(mythis.jsonDataToken, contractAddressToken);
        console.log("res", res[0]);
        console.log("add", contractAddressSwapToken);


        var balance = await tokenInst.methods.allowance(res[0], contractAddressSwapToken).call();
        var realBalance = await tokenInst.methods.balanceOf(res[0]).call();

        console.log('sssss reral ', realBalance)
  
        if(this.amount>= w3js.utils.fromWei(balance, 'ether')){
          mythis.resapproveof = false;
        }
        if (res) {
          try{
            var tokenInst = await new w3js.eth.Contract(mythis.jsonDataToken, contractAddressToken);
            let resapprove = await tokenInst.methods.approve(contractAddressSwapToken, w3js.utils.toWei(mythis.amount, 'ether')).send({ from: res[0] });
            console.log("thus", resapprove);
            mythis.resapproveof = true;
            this.loading = true;
            mythis.spinner.hide();
          }catch(error){
            mythis.spinner.hide();
          }
         
        } else {
          mythis.zone.run(() => {
            let obj = {

              address: 'Please authorise you account to view',

              balance: 'Please authorise you account to view'

            };
            mythis.ethAddressList.push(obj);
          });
        }
      });
    } else {
      alert('Web3 Not Supported/not autorized');
    }
  }

  swap() {
    if (typeof this.web3 !== 'undefined') {

      var w3js: any = new Web3(this.web3.currentProvider);
      var mythis = this;
      
      var contractAddressSwapToken = "0x1570dfB075b152311E0864D6dD387f9748B0C771";
      w3js.eth.getAccounts(async function (err, res) {

        if (res) {
          var tokenInst = await new w3js.eth.Contract(mythis.JsonDataSwap, contractAddressSwapToken);
          let wres = await tokenInst.methods.buyTokens(res[0], w3js.utils.toWei(mythis.amount, 'ether')).send({ from: res[0], gas: '210000', gasPrice: w3js.utils.toWei('15', 'gwei') });
          console.log("res", wres);

        } else {
          mythis.zone.run(() => {
            let obj = {

              address: 'Please authorise you account to view',

              balance: 'Please authorise you account to view'

            };
            mythis.ethAddressList.push(obj);
          });
        }
      });
    } else {
      alert('Web3 Not Supported/not autorized');
    }
  }

   async trustWallet() {
    // var provider: any = new WalletConnectProvider({
    //   infuraId: "f655b88124184d209b6066f2b1b9d2d1", // Required
    // });

    // //  Enable session (triggers QR Code modal)
    // await provider.enable();

    // //  Create Web3
    // // this.Web3 = new Web3(provider);
    // var w3js: any = new Web3(provider);
    // const accounts = await w3js.eth.getAccounts();
    // console.log("trustwallet", accounts);

   }
}
