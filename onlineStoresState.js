"use strict";
var onlineStoresState = {
    executeAction: function (action, state) {
        var response = [];

        var websiteList = [
           'Amazon',
           'Alibaba',
           'barnes and nobel',
           'best buy',
           'booking',
           'cheap tickets',
           'direct buy',
           'DVDempire',
           'ebay',
           'etoys',
           'expedia',
           'freshdirect',
           'Gamefly',
           'GiftTree',
           'GoAntiques',
           'GoogleAuthors',
           'GooglePlay',
           'AppStore',
           'Hotels.com',
           'iauthor',
           'ikea',
           'jumia',
           'Kobo',
           'Lord & Taylor',
           'Mobile17',
           'motorcycle superstore',
           'Netflix',
           'newegg',
           'Nordstrom Rack',
           'One way furniture',
           'online stores ink',
           'Orbitz',
           'Pet Food store express',
           'Pets.com',
           'priceline',
           'Qioptiq',
           'restockit',
           'represent',
           'shoes.com',
           'ThinkGeek',
           'Ticketmaster',
           'ubid',
           'vetDepot',
           'walmart',
           'xessory',
           'yachtworld',
           'Zappos'
        ];

        var websiteName = action.toLowerCase();
        var foundWebsite = false;

        websiteList.forEach(onlineStoreName => {
            if(websiteName===onlineStoreName.toLowerCase()){
                foundWebsite = true;
                break;
            }
        });

        if(foundWebsite){
            response[0] = {text: 'Please enter transaction #'};
            return { "state": { "state": "enterTransactionNumberState", "senderPsid": state.senderPsid }, "response": response };
        } else{

            var websiteNameFirstCharacter = str.charAt(0);

            switch(websiteNameFirstCharacter){
                case 'a':
                response[0] = {
                    text: 'Did you mean:',
                    quick_replies: [
                        {
                            content_type: "text",
                            title: "Amazon",
                            payload: "Amazon"
                        },
                        {
                            content_type: "text",
                            title: "Alibaba",
                            payload: "Alibaba"
                        },
                        {
                            content_type: "text",
                            title: "AppStore",
                            payload: "AppStore"
                        }
                    ]
                };
                break;
                case 'b':
                response[0] = {
                    text: 'Did you mean:',
                    quick_replies: [
                        {
                            content_type: "text",
                            title: "Barnes and Nobel",
                            payload: "Barnes and Nobel"
                        },
                        {
                            content_type: "text",
                            title: "Best Buy",
                            payload: "Best Buy"
                        },
                        {
                            content_type: "text",
                            title: "Booking",
                            payload: "Booking"
                        }
                    ]
                };
                break;
                case 'c':
                response[0] = {
                    text: 'Did you mean:',
                    quick_replies: [
                        {
                            content_type: "text",
                            title: "Cheap Tickets",
                            payload: "Cheap Tickets"
                        }
                    ]
                };
                break;
                case 'd':
                response[0] = {
                    text: 'Did you mean:',
                    quick_replies: [
                        {
                            content_type: "text",
                            title: "Direct Buy",
                            payload: "Direct Buy"
                        },
                        {
                            content_type: "text",
                            title: "DVDempire",
                            payload: "DVDempire"
                        }
                    ]
                };
                break;
                case 'e':
                response[0] = {
                    text: 'Did you mean:',
                    quick_replies: [
                        {
                            content_type: "text",
                            title: "ebay",
                            payload: "ebay"
                        },
                        {
                            content_type: "text",
                            title: "etoys",
                            payload: "etoys"
                        },
                        {
                            content_type: "text",
                            title: "expedia",
                            payload: "expedia"
                        }
                    ]
                };
                break;
                case 'f':
                response[0] = {
                    text: 'Did you mean:',
                    quick_replies: [
                        {
                            content_type: "text",
                            title: "freshdirect",
                            payload: "freshdirect"
                        }
                    ]
                };
                break;
                case 'g':
                response[0] = {
                    text: 'Did you mean:',
                    quick_replies: [
                        {
                            content_type: "text",
                            title: "Gamefly",
                            payload: "Gamefly"
                        },
                        {
                            content_type: "text",
                            title: "GiftTree",
                            payload: "GiftTree"
                        },
                        {
                            content_type: "text",
                            title: "GoAntiques",
                            payload: "GoAntiques"
                        },
                        {
                            content_type: "text",
                            title: "Google Authors",
                            payload: "GoogleAuthors"
                        },
                        {
                            content_type: "text",
                            title: "Google Play",
                            payload: "GoogleAuthors"
                        }
                    ]
                };
                break;
                case 'h':
                response[0] = {
                    text: 'Did you mean:',
                    quick_replies: [
                        {
                            content_type: "text",
                            title: "Hotels.com",
                            payload: "Hotels.com"
                        }
                    ]
                };
                break;
                case 'i':
                response[0] = {
                    text: 'Did you mean:',
                    quick_replies: [
                        {
                            content_type: "text",
                            title: "iauthor",
                            payload: "iauthor"
                        },
                        {
                            content_type: "text",
                            title: "ikea",
                            payload: "ikea"
                        }
                    ]
                };
                break;
                case 'j':
                response[0] = {
                    text: 'Did you mean:',
                    quick_replies: [
                        {
                            content_type: "text",
                            title: "Jumia",
                            payload: "jumia"
                        }
                    ]
                };
                break;
                case 'k':
                response[0] = {
                    text: 'Did you mean:',
                    quick_replies: [
                        {
                            content_type: "text",
                            title: "Kobo",
                            payload: "Kobo"
                        }
                    ]
                };
                break;
                case 'l':
                response[0] = {
                    text: 'Did you mean:',
                    quick_replies: [
                        {
                            content_type: "text",
                            title: "Lord & Taylor",
                            payload: "Lord & Taylor"
                        }
                    ]
                };
                break;
                case 'm':
                response[0] = {
                    text: 'Did you mean:',
                    quick_replies: [
                        {
                            content_type: "text",
                            title: "Mobile17",
                            payload: "Mobile17"
                        },
                        {
                            content_type: "text",
                            title: "motorcycle superstore",
                            payload: "motorcycle superstore"
                        }
                    ]
                };
                break;
                case 'n':
                response[0] = {
                    text: 'Did you mean:',
                    quick_replies: [
                        {
                            content_type: "text",
                            title: "Netflix",
                            payload: "Netflix"
                        },
                        {
                            content_type: "text",
                            title: "newegg",
                            payload: "newegg"
                        },
                        {
                            content_type: "text",
                            title: "Nordstrom Rack",
                            payload: "Nordstrom Rack"
                        }
                    ]
                };
                break;
                case 'o':
                response[0] = {
                    text: 'Did you mean:',
                    quick_replies: [
                        {
                            content_type: "text",
                            title: "One way furniture",
                            payload: "One way furniture"
                        },
                        {
                            content_type: "text",
                            title: "online stores ink",
                            payload: "online stores ink"
                        },
                        {
                            content_type: "text",
                            title: "Orbitz",
                            payload: "Orbitz"
                        }
                    ]
                };
                break;
                case 'p':
                response[0] = {
                    text: 'Did you mean:',
                    quick_replies: [
                        {
                            content_type: "text",
                            title: "Pet Food store express",
                            payload: "Pet Food store express"
                        },
                        {
                            content_type: "text",
                            title: "Pets.com",
                            payload: "Pets.com"
                        },
                        {
                            content_type: "text",
                            title: "priceline",
                            payload: "priceline"
                        }
                    ]
                };
                break;
                case 'q':
                response[0] = {
                    text: 'Did you mean:',
                    quick_replies: [
                        {
                            content_type: "text",
                            title: "Qioptiq",
                            payload: "Qioptiq"
                        }
                    ]
                };
                break;
                case 'r':
                response[0] = {
                    text: 'Did you mean:',
                    quick_replies: [
                        {
                            content_type: "text",
                            title: "restockit",
                            payload: "restockit"
                        },
                        {
                            content_type: "text",
                            title: "represent",
                            payload: "represent"
                        }
                    ]
                };
                break;
                case 's':
                response[0] = {
                    text: 'Did you mean:',
                    quick_replies: [
                        {
                            content_type: "text",
                            title: "shoes.com",
                            payload: "shoes.com"
                        }
                    ]
                };
                break;
                case 't':
                response[0] = {
                    text: 'Did you mean:',
                    quick_replies: [
                        {
                            content_type: "text",
                            title: "ThinkGeek",
                            payload: "ThinkGeek"
                        },
                        {
                            content_type: "text",
                            title: "Ticketmaster",
                            payload: "Ticketmaster"
                        }
                    ]
                };
                break;
                case 'u':
                response[0] = {
                    text: 'Did you mean:',
                    quick_replies: [
                        {
                            content_type: "text",
                            title: "ubid",
                            payload: "ubid"
                        }
                    ]
                };
                break;
                case 'v':
                response[0] = {
                    text: 'Did you mean:',
                    quick_replies: [
                        {
                            content_type: "text",
                            title: "vetDepot",
                            payload: "vetDepot"
                        }
                    ]
                };
                break;
                case 'w':
                response[0] = {
                    text: 'Did you mean:',
                    quick_replies: [
                        {
                            content_type: "text",
                            title: "walmart",
                            payload: "walmart"
                        }
                    ]
                };
                break;
                case 'x':
                response[0] = {
                    text: 'Did you mean:',
                    quick_replies: [
                        {
                            content_type: "text",
                            title: "xessory",
                            payload: "xessory"
                        }
                    ]
                };
                break;
                case 'y':
                response[0] = {
                    text: 'Did you mean:',
                    quick_replies: [
                        {
                            content_type: "text",
                            title: "yachtworld",
                            payload: "yachtworld"
                        }
                    ]
                };
                break;
                case 'z':
                response[0] = {
                    text: 'Did you mean:',
                    quick_replies: [
                        {
                            content_type: "text",
                            title: "Zappos",
                            payload: "Zappos"
                        }
                    ]
                };
                break;
                default:
                response[0] = {text: 'Website not recognized. Please enter a valid website or type Logout to end chat session.'};
                return { "state": { "state": "enterTransactionNumberState", "senderPsid": state.senderPsid }, "response": response };
            }

            return { "state": { "state": "onlineStoresState", "senderPsid": state.senderPsid }, "response": response };
        }
        
            
       
    }
};

module.exports = onlineStoresState;
