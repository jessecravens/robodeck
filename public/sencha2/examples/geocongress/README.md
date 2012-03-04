# Geo Congress

## Overview

After determining your location, the GeoCongress example displays a list of Legislators in your district.

By tapping on a Legislator, you will be able to view information on:

  - Name, Party, State and District, Phone, Email and Website
  - Committee Assignments
  - Bills
  - Votes

## API endpoints

Data is retrieved from the following sources:

 - http://services.sunlightlabs.com

### Legislators by Location

Docs for this API are at http://services.sunlightlabs.com/docs/congressapi/legislators.allForLatLong/

Example request:

    http://services.sunlightlabs.com/api/legislators.allForLatLong.json?latitude=37.442231&longitude=-122.143346&apikey=8a341f85c657435989e75c9a83294762

Examples response:

    {
        "response": {
            "legislators": [
                {
                    "legislator": {
                        "website": "http://www.boxer.senate.gov",
                        "fax": "202-224-0454",
                        "govtrack_id": "300011",
                        "firstname": "Barbara",
                        "chamber": "senate",
                        "middlename": "",
                        "lastname": "Boxer",
                        "congress_office": "112 Hart Senate Office Building",
                        "eventful_id": "",
                        "phone": "202-224-3553",
                        "webform": "http://www.boxer.senate.gov/en/contact/",
                        "youtube_url": "http://www.youtube.com/SenatorBoxer",
                        "nickname": "",
                        "gender": "F",
                        "district": "Junior Seat",
                        "title": "Sen",
                        "congresspedia_url": "http://www.opencongress.org/wiki/Barbara_Boxer",
                        "in_office": true,
                        "senate_class": "III",
                        "name_suffix": "",
                        "twitter_id": "senatorboxer",
                        "birthdate": "1940-11-11",
                        "bioguide_id": "B000711",
                        "fec_id": "S2CA00286",
                        "state": "CA",
                        "crp_id": "N00006692",
                        "official_rss": "",
                        "facebook_id": "barbaraboxer",
                        "party": "D",
                        "email": "",
                        "votesmart_id": "53274"
                    }
                }
            ]
        }
    }

### Committee by Legislator

Docs for this API are at http://services.sunlightlabs.com/docs/congressapi/committees.allForLegislator/

Examples request:

    http://services.sunlightlabs.com/api/committees.allForLegislator?bioguide_id=B000711&apikey=8a341f85c657435989e75c9a83294762

Examples response:

    {
        "response": {
            "committees": [
                {
                    "committee": {
                        "chamber": "Senate",
                        "id": "SSEV",
                        "name": "Senate Committee on Environment and Public Works"
                    }
                },
                {
                    "committee": {
                        "chamber": "Senate",
                        "id": "SSCM",
                        "name": "Senate Committee on Commerce, Science, and Transportation",
                        "subcommittees": [
                            {
                                "committee": {
                                    "chamber": "Senate",
                                    "id": "SSCM_1",
                                    "name": "Aviation Operations, Safety, and Security"
                                }
                            },
                            {
                                "committee": {
                                    "chamber": "Senate",
                                    "id": "SSCM_20",
                                    "name": "Consumer Protection, Product Safety, and Insurance"
                                }
                            }
                        ]
                    }
                }
            ]
        }
    }


## Bills by Legislator

Docs for this API are at http://services.sunlightlabs.com/docs/Real_Time_Congress_API/bills/

Examples request:

    http://api.realtimecongress.org/api/v1/bills.json?apikey=8a341f85c657435989e75c9a83294762&sponsor_id=B000711

Examples response:

    {
        "page": {
            "per_page": 20,
            "page": 1,
            "count": 20
        },
        "count": 128,
        "bills": [
            {
                "abbreviated": false,
                "actions": [
                    {
                        "type": "action",
                        "text": "Read twice and referred to the Committee on the Judiciary.",
                        "acted_at": "2011-11-17T12:00:00Z"
                    }
                ],
                "awaiting_signature": false,
                "bill_id": "s1889-112",
                "bill_type": "s",
                "chamber": "senate",
                "code": "s1889",
                "committees": {
                    "SSJU": {
                        "activity": [
                            "referral",
                            "in committee"
                        ],
                        "committee": {
                            "name": "Senate Committee on the Judiciary",
                            "committee_id": "SSJU",
                            "chamber": "senate"
                        }
                    }
                },
                "cosponsor_ids": [],
                "cosponsors": [],
                "cosponsors_count": 0,
                "enacted": false,
                "introduced_at": "2011-11-17T12:00:00Z",
                "keywords": [
                    "Social welfare",
                    "Crimes against children",
                    "Criminal justice information and records",
                    "Domestic violence and child abuse",
                    "Government buildings, facilities, and property",
                    "Health personnel",
                    "Social work, volunteer service, charitable organizations"
                ],
                "last_action": {
                    "type": "action",
                    "text": "Read twice and referred to the Committee on the Judiciary.",
                    "acted_at": "2011-11-17T12:00:00Z"
                },
                "last_action_at": "2011-11-17T12:00:00Z",
                "last_passage_vote_at": null,
                "last_version": {
                    "version_name": "Introduced in Senate",
                    "issued_on": "2011-11-17",
                    "urls": {
                        "html": "http://www.gpo.gov/fdsys/pkg/BILLS-112s1889is/html/BILLS-112s1889is.htm",
                        "xml": "http://www.gpo.gov/fdsys/pkg/BILLS-112s1889is/xml/BILLS-112s1889is.xml",
                        "pdf": "http://www.gpo.gov/fdsys/pkg/BILLS-112s1889is/pdf/BILLS-112s1889is.pdf"
                    },
                    "version_code": "is",
                    "bill_version_id": "s1889-112-is"
                },
                "last_version_on": "2011-11-17",
                "number": 1889,
                "official_title": "A bill to protect children from neglect and abuse on Federal property.",
                "passage_votes": [],
                "passage_votes_count": 0,
                "popular_title": null,
                "related_bills": {},
                "session": 112,
                "short_title": "Federal Children's Protection Act",
                "sponsor": {
                    "bioguide_id": "B000711",
                    "chamber": "senate",
                    "district": "Junior Seat",
                    "first_name": "Barbara",
                    "govtrack_id": "300011",
                    "last_name": "Boxer",
                    "name_suffix": "",
                    "nickname": "",
                    "party": "D",
                    "state": "CA",
                    "title": "Sen"
                },
                "sponsor_id": "B000711",
                "state": "INTRODUCED",
                "summary": null,
                "titles": [
                    {
                        "type": "short",
                        "as": "introduced",
                        "title": "Federal Children's Protection Act"
                    },
                    {
                        "type": "official",
                        "as": "introduced",
                        "title": "A bill to protect children from neglect and abuse on Federal property."
                    }
                ],
                "version_codes": [
                    "is"
                ],
                "version_info": [
                    {
                        "version_name": "Introduced in Senate",
                        "issued_on": "2011-11-17",
                        "urls": {
                            "html": "http://www.gpo.gov/fdsys/pkg/BILLS-112s1889is/html/BILLS-112s1889is.htm",
                            "xml": "http://www.gpo.gov/fdsys/pkg/BILLS-112s1889is/xml/BILLS-112s1889is.xml",
                            "pdf": "http://www.gpo.gov/fdsys/pkg/BILLS-112s1889is/pdf/BILLS-112s1889is.pdf"
                        },
                        "version_code": "is",
                        "bill_version_id": "s1889-112-is"
                    }
                ],
                "versions_count": 1,
                "vetoed": false
            }
        ]
    }

