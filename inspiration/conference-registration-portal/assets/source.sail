a!headerContentLayout(
  header: {
    a!cardLayout(
      contents: {},
      height: "AUTO",
      showWhen: a!isPageWidth(
        {
          "DESKTOP_NARROW",
          "DESKTOP",
          "DESKTOP_WIDE"
        }
      ),
      style: "#f8f6f0",
      padding: "STANDARD",
      marginBelow: "NONE",
      showBorder: false
    )
  },
  contents: {
    a!columnsLayout(
      columns: {
        a!columnLayout(contents: {}),
        a!columnLayout(
          contents: {
            a!imageField(
              label: "",
              labelPosition: "COLLAPSED",
              /* This is a placeholder image; replace as needed */
              images: {
                a!documentImage(
                  document: a!EXAMPLE_DOCUMENT_IMAGE(),
                  altText: "ESG World 2023 Logo"
                )
              },
              size: if(
                a!isPageWidth(
                  {
                    "TABLET_LANDSCAPE",
                    "TABLET_PORTRAIT",
                    "PHONE"
                  }
                ),
                "MEDIUM",
                "FIT"
              ),
              isThumbnail: false,
              style: "STANDARD",
              align: if(
                a!isPageWidth(
                  {
                    "TABLET_LANDSCAPE",
                    "TABLET_PORTRAIT",
                    "PHONE"
                  }
                ),
                "START",
                "CENTER"
              ),
              marginAbove: "LESS",
              marginBelow: "MORE"
            ),
            a!dropdownField(
              label: "Select Language",
              labelPosition: "COLLAPSED",
              placeholder: "",
              choiceLabels: {
                "ENGLISH",
                "简体中文",
                "हिन्दी",
                "ESPAÑOL",
                "FRANÇAIS",
                "العربية",
                "DEUTSCHE",
                "日本語"
              },
              choiceValues: { 1, 2, 3, 4, 5, 6, 7, 8 },
              value: 1,
              saveInto: {},
              searchDisplay: "AUTO",
              showWhen: a!isPageWidth({ "PHONE", "TABLET_PORTRAIT" }),
              validations: {}
            ),
            a!richTextDisplayField(
              labelPosition: "COLLAPSED",
              value: {
                "ESG World 2023 is the most important global gathering of advocates and thought leaders on ",
                a!richTextItem(
                  text: { "Environmental" },
                  style: { "STRONG" }
                ),
                ", ",
                a!richTextItem(text: { "Social" }, style: { "STRONG" }),
                ", and ",
                a!richTextItem(text: { "Governance" }, style: { "STRONG" }),
                " topics."
              },
              marginAbove: "STANDARD",
              marginBelow: "EVEN_MORE"
            ),
            a!sideBySideLayout(
              items: {
                a!sideBySideItem(
                  item: a!richTextDisplayField(
                    labelPosition: "COLLAPSED",
                    value: {
                      a!richTextItem(
                        text: { "ENGLISH" },
                        link: a!dynamicLink(),
                        linkStyle: "STANDALONE",
                        color: "#111111",
                        style: { "STRONG", "UNDERLINE" }
                      )
                    }
                  ),
                  width: "MINIMIZE"
                ),
                a!sideBySideItem(
                  item: a!richTextDisplayField(
                    labelPosition: "COLLAPSED",
                    value: {
                      a!richTextItem(
                        text: { "简体中文" },
                        link: a!dynamicLink(),
                        linkStyle: "STANDALONE",
                        color: "#111111"
                      )
                    }
                  ),
                  width: "MINIMIZE"
                ),
                a!sideBySideItem(
                  item: a!richTextDisplayField(
                    labelPosition: "COLLAPSED",
                    value: {
                      a!richTextItem(
                        text: { "हिन्दी" },
                        link: a!dynamicLink(),
                        linkStyle: "STANDALONE",
                        color: "#111111"
                      )
                    }
                  ),
                  width: "MINIMIZE"
                ),
                a!sideBySideItem(
                  item: a!richTextDisplayField(
                    labelPosition: "COLLAPSED",
                    value: {
                      a!richTextItem(
                        text: { "ESPAÑOL" },
                        link: a!dynamicLink(),
                        linkStyle: "STANDALONE",
                        color: "#111111"
                      )
                    }
                  ),
                  width: "MINIMIZE"
                ),
                a!sideBySideItem(
                  item: a!richTextDisplayField(
                    labelPosition: "COLLAPSED",
                    value: {
                      a!richTextItem(
                        text: { "FRANÇAIS" },
                        link: a!dynamicLink(),
                        linkStyle: "STANDALONE",
                        color: "#111111"
                      )
                    }
                  ),
                  width: "MINIMIZE"
                ),
                a!sideBySideItem(
                  item: a!richTextDisplayField(
                    labelPosition: "COLLAPSED",
                    value: {
                      a!richTextItem(
                        text: { "العربية" },
                        link: a!dynamicLink(),
                        linkStyle: "STANDALONE",
                        color: "#111111"
                      )
                    }
                  ),
                  width: "MINIMIZE"
                ),
                a!sideBySideItem(
                  item: a!richTextDisplayField(
                    labelPosition: "COLLAPSED",
                    value: {
                      a!richTextItem(
                        text: { "DEUTSCHE" },
                        link: a!dynamicLink(),
                        linkStyle: "STANDALONE",
                        color: "#111111"
                      )
                    }
                  ),
                  width: "MINIMIZE"
                ),
                a!sideBySideItem(
                  item: a!richTextDisplayField(
                    labelPosition: "COLLAPSED",
                    value: {
                      a!richTextItem(
                        text: { "日本語" },
                        link: a!dynamicLink(),
                        linkStyle: "STANDALONE",
                        color: "#111111"
                      )
                    }
                  ),
                  width: "MINIMIZE"
                ),
                a!sideBySideItem()
              },
              showWhen: not(
                a!isPageWidth({ "PHONE", "TABLET_PORTRAIT" })
              ),
              spacing: "SPARSE",
              stackWhen: {
                "DESKTOP_WIDE",
                "DESKTOP",
                "DESKTOP_NARROW"
              }
            )
          },
          width: "NARROW_PLUS"
        ),
        a!columnLayout(contents: {}, width: "EXTRA_NARROW"),
        a!columnLayout(
          contents: {
            a!sectionLayout(
              label: "REGISTER NOW",
              labelSize: "LARGE",
              labelHeadingTag: "H1",
              labelColor: "STANDARD",
              contents: {
                a!richTextDisplayField(
                  labelPosition: "COLLAPSED",
                  value: {
                    "Registration is free of charge for this year's virtual conference"
                  },
                  marginBelow: "STANDARD"
                )
              },
              divider: "BELOW",
              marginAbove: "STANDARD",
              marginBelow: "MORE"
            ),
            a!sectionLayout(
              label: "YOUR DETAILS",
              labelSize: "SMALL",
              labelHeadingTag: "H2",
              labelColor: "STANDARD",
              contents: {
                a!columnsLayout(
                  columns: {
                    a!columnLayout(
                      contents: {
                        a!textField(
                          label: "First Name",
                          labelPosition: "ABOVE",
                          saveInto: {},
                          refreshAfter: "UNFOCUS",
                          validations: {}
                        )
                      }
                    ),
                    a!columnLayout(
                      contents: {
                        a!textField(
                          label: "Last Name",
                          labelPosition: "ABOVE",
                          saveInto: {},
                          refreshAfter: "UNFOCUS",
                          validations: {}
                        )
                      }
                    )
                  },
                  marginAbove: "STANDARD",
                  marginBelow: "STANDARD",
                  stackWhen: { "PHONE" }
                ),
                a!columnsLayout(
                  columns: {
                    a!columnLayout(
                      contents: {
                        a!textField(
                          label: "Email Address",
                          labelPosition: "ABOVE",
                          saveInto: {},
                          refreshAfter: "UNFOCUS",
                          validations: {}
                        )
                      }
                    ),
                    a!columnLayout(
                      contents: {
                        a!dropdownField(
                          label: "Country",
                          labelPosition: "ABOVE",
                          placeholder: "--- Select country of residence ---",
                          choiceLabels: {
                            "Afghanistan",
                            "Åland Islands",
                            "Albania",
                            "Algeria",
                            "American Samoa",
                            "Andorra",
                            "Angola",
                            "Anguilla",
                            "Antarctica",
                            "Antigua and Barbuda",
                            "Argentina",
                            "Armenia",
                            "Aruba",
                            "Australia",
                            "Austria",
                            "Azerbaijan",
                            "Bahamas",
                            "Bahrain",
                            "Bangladesh",
                            "Barbados",
                            "Belarus",
                            "Belgium",
                            "Belize",
                            "Benin",
                            "Bermuda",
                            "Bhutan",
                            "Bolivia",
                            "Bosnia and Herzegovina",
                            "Botswana",
                            "Bouvet Island",
                            "Brazil",
                            "British Indian Ocean Territory",
                            "Brunei Darussalam",
                            "Bulgaria",
                            "Burkina Faso",
                            "Burundi",
                            "Cambodia",
                            "Cameroon",
                            "Canada",
                            "Cape Verde",
                            "Cayman Islands",
                            "Central African Republic",
                            "Chad",
                            "Chile",
                            "China",
                            "Christmas Island",
                            "Cocos (Keeling) Islands",
                            "Colombia",
                            "Comoros",
                            "Congo",
                            "Congo, The Democratic Republic of The",
                            "Cook Islands",
                            "Costa Rica",
                            "Cote D'ivoire",
                            "Croatia",
                            "Cuba",
                            "Cyprus",
                            "Czech Republic",
                            "Denmark",
                            "Djibouti",
                            "Dominica",
                            "Dominican Republic",
                            "Ecuador",
                            "Egypt",
                            "El Salvador",
                            "Equatorial Guinea",
                            "Eritrea",
                            "Estonia",
                            "Ethiopia",
                            "Falkland Islands (Malvinas)",
                            "Faroe Islands",
                            "Fiji",
                            "Finland",
                            "France",
                            "French Guiana",
                            "French Polynesia",
                            "French Southern Territories",
                            "Gabon",
                            "Gambia",
                            "Georgia",
                            "Germany",
                            "Ghana",
                            "Gibraltar",
                            "Greece",
                            "Greenland",
                            "Grenada",
                            "Guadeloupe",
                            "Guam",
                            "Guatemala",
                            "Guernsey",
                            "Guinea",
                            "Guinea-bissau",
                            "Guyana",
                            "Haiti",
                            "Heard Island and Mcdonald Islands",
                            "Holy See (Vatican City State)",
                            "Honduras",
                            "Hong Kong",
                            "Hungary",
                            "Iceland",
                            "India",
                            "Indonesia",
                            "Iran, Islamic Republic of",
                            "Iraq",
                            "Ireland",
                            "Isle of Man",
                            "Israel",
                            "Italy",
                            "Jamaica",
                            "Japan",
                            "Jersey",
                            "Jordan",
                            "Kazakhstan",
                            "Kenya",
                            "Kiribati",
                            "Korea, Democratic People's Republic of",
                            "Korea, Republic of",
                            "Kuwait",
                            "Kyrgyzstan",
                            "Lao People's Democratic Republic",
                            "Latvia",
                            "Lebanon",
                            "Lesotho",
                            "Liberia",
                            "Libyan Arab Jamahiriya",
                            "Liechtenstein",
                            "Lithuania",
                            "Luxembourg",
                            "Macao",
                            "Macedonia, The Former Yugoslav Republic of",
                            "Madagascar",
                            "Malawi",
                            "Malaysia",
                            "Maldives",
                            "Mali",
                            "Malta",
                            "Marshall Islands",
                            "Martinique",
                            "Mauritania",
                            "Mauritius",
                            "Mayotte",
                            "Mexico",
                            "Micronesia, Federated States of",
                            "Moldova, Republic of",
                            "Monaco",
                            "Mongolia",
                            "Montenegro",
                            "Montserrat",
                            "Morocco",
                            "Mozambique",
                            "Myanmar",
                            "Namibia",
                            "Nauru",
                            "Nepal",
                            "Netherlands",
                            "Netherlands Antilles",
                            "New Caledonia",
                            "New Zealand",
                            "Nicaragua",
                            "Niger",
                            "Nigeria",
                            "Niue",
                            "Norfolk Island",
                            "Northern Mariana Islands",
                            "Norway",
                            "Oman",
                            "Pakistan",
                            "Palau",
                            "Palestinian Territory, Occupied",
                            "Panama",
                            "Papua New Guinea",
                            "Paraguay",
                            "Peru",
                            "Philippines",
                            "Pitcairn",
                            "Poland",
                            "Portugal",
                            "Puerto Rico",
                            "Qatar",
                            "Reunion",
                            "Romania",
                            "Russia",
                            "Rwanda",
                            "Saint Helena",
                            "Saint Kitts and Nevis",
                            "Saint Lucia",
                            "Saint Pierre and Miquelon",
                            "Saint Vincent and The Grenadines",
                            "Samoa",
                            "San Marino",
                            "Sao Tome and Principe",
                            "Saudi Arabia",
                            "Senegal",
                            "Serbia",
                            "Seychelles",
                            "Sierra Leone",
                            "Singapore",
                            "Slovakia",
                            "Slovenia",
                            "Solomon Islands",
                            "Somalia",
                            "South Africa",
                            "South Georgia and The South Sandwich Islands",
                            "Spain",
                            "Sri Lanka",
                            "Sudan",
                            "Suriname",
                            "Svalbard and Jan Mayen",
                            "Eswatini",
                            "Sweden",
                            "Switzerland",
                            "Syrian Arab Republic",
                            "Taiwan (ROC)",
                            "Tajikistan",
                            "Tanzania, United Republic of",
                            "Thailand",
                            "Timor-leste",
                            "Togo",
                            "Tokelau",
                            "Tonga",
                            "Trinidad and Tobago",
                            "Tunisia",
                            "Turkey",
                            "Turkmenistan",
                            "Turks and Caicos Islands",
                            "Tuvalu",
                            "Uganda",
                            "Ukraine",
                            "United Arab Emirates",
                            "United Kingdom",
                            "United States",
                            "United States Minor Outlying Islands",
                            "Uruguay",
                            "Uzbekistan",
                            "Vanuatu",
                            "Venezuela",
                            "Vietnam",
                            "Virgin Islands, British",
                            "Virgin Islands, U.S.",
                            "Wallis and Futuna",
                            "Western Sahara",
                            "Yemen",
                            "Zambia",
                            "Zimbabwe"
                          },
                          choiceValues: {
                            "Afghanistan",
                            "Åland Islands",
                            "Albania",
                            "Algeria",
                            "American Samoa",
                            "Andorra",
                            "Angola",
                            "Anguilla",
                            "Antarctica",
                            "Antigua and Barbuda",
                            "Argentina",
                            "Armenia",
                            "Aruba",
                            "Australia",
                            "Austria",
                            "Azerbaijan",
                            "Bahamas",
                            "Bahrain",
                            "Bangladesh",
                            "Barbados",
                            "Belarus",
                            "Belgium",
                            "Belize",
                            "Benin",
                            "Bermuda",
                            "Bhutan",
                            "Bolivia",
                            "Bosnia and Herzegovina",
                            "Botswana",
                            "Bouvet Island",
                            "Brazil",
                            "British Indian Ocean Territory",
                            "Brunei Darussalam",
                            "Bulgaria",
                            "Burkina Faso",
                            "Burundi",
                            "Cambodia",
                            "Cameroon",
                            "Canada",
                            "Cape Verde",
                            "Cayman Islands",
                            "Central African Republic",
                            "Chad",
                            "Chile",
                            "China",
                            "Christmas Island",
                            "Cocos (Keeling) Islands",
                            "Colombia",
                            "Comoros",
                            "Congo",
                            "Congo, The Democratic Republic of The",
                            "Cook Islands",
                            "Costa Rica",
                            "Cote D'ivoire",
                            "Croatia",
                            "Cuba",
                            "Cyprus",
                            "Czech Republic",
                            "Denmark",
                            "Djibouti",
                            "Dominica",
                            "Dominican Republic",
                            "Ecuador",
                            "Egypt",
                            "El Salvador",
                            "Equatorial Guinea",
                            "Eritrea",
                            "Estonia",
                            "Ethiopia",
                            "Falkland Islands (Malvinas)",
                            "Faroe Islands",
                            "Fiji",
                            "Finland",
                            "France",
                            "French Guiana",
                            "French Polynesia",
                            "French Southern Territories",
                            "Gabon",
                            "Gambia",
                            "Georgia",
                            "Germany",
                            "Ghana",
                            "Gibraltar",
                            "Greece",
                            "Greenland",
                            "Grenada",
                            "Guadeloupe",
                            "Guam",
                            "Guatemala",
                            "Guernsey",
                            "Guinea",
                            "Guinea-bissau",
                            "Guyana",
                            "Haiti",
                            "Heard Island and Mcdonald Islands",
                            "Holy See (Vatican City State)",
                            "Honduras",
                            "Hong Kong",
                            "Hungary",
                            "Iceland",
                            "India",
                            "Indonesia",
                            "Iran, Islamic Republic of",
                            "Iraq",
                            "Ireland",
                            "Isle of Man",
                            "Israel",
                            "Italy",
                            "Jamaica",
                            "Japan",
                            "Jersey",
                            "Jordan",
                            "Kazakhstan",
                            "Kenya",
                            "Kiribati",
                            "Korea, Democratic People's Republic of",
                            "Korea, Republic of",
                            "Kuwait",
                            "Kyrgyzstan",
                            "Lao People's Democratic Republic",
                            "Latvia",
                            "Lebanon",
                            "Lesotho",
                            "Liberia",
                            "Libyan Arab Jamahiriya",
                            "Liechtenstein",
                            "Lithuania",
                            "Luxembourg",
                            "Macao",
                            "Macedonia, The Former Yugoslav Republic of",
                            "Madagascar",
                            "Malawi",
                            "Malaysia",
                            "Maldives",
                            "Mali",
                            "Malta",
                            "Marshall Islands",
                            "Martinique",
                            "Mauritania",
                            "Mauritius",
                            "Mayotte",
                            "Mexico",
                            "Micronesia, Federated States of",
                            "Moldova, Republic of",
                            "Monaco",
                            "Mongolia",
                            "Montenegro",
                            "Montserrat",
                            "Morocco",
                            "Mozambique",
                            "Myanmar",
                            "Namibia",
                            "Nauru",
                            "Nepal",
                            "Netherlands",
                            "Netherlands Antilles",
                            "New Caledonia",
                            "New Zealand",
                            "Nicaragua",
                            "Niger",
                            "Nigeria",
                            "Niue",
                            "Norfolk Island",
                            "Northern Mariana Islands",
                            "Norway",
                            "Oman",
                            "Pakistan",
                            "Palau",
                            "Palestinian Territory, Occupied",
                            "Panama",
                            "Papua New Guinea",
                            "Paraguay",
                            "Peru",
                            "Philippines",
                            "Pitcairn",
                            "Poland",
                            "Portugal",
                            "Puerto Rico",
                            "Qatar",
                            "Reunion",
                            "Romania",
                            "Russia",
                            "Rwanda",
                            "Saint Helena",
                            "Saint Kitts and Nevis",
                            "Saint Lucia",
                            "Saint Pierre and Miquelon",
                            "Saint Vincent and The Grenadines",
                            "Samoa",
                            "San Marino",
                            "Sao Tome and Principe",
                            "Saudi Arabia",
                            "Senegal",
                            "Serbia",
                            "Seychelles",
                            "Sierra Leone",
                            "Singapore",
                            "Slovakia",
                            "Slovenia",
                            "Solomon Islands",
                            "Somalia",
                            "South Africa",
                            "South Georgia and The South Sandwich Islands",
                            "Spain",
                            "Sri Lanka",
                            "Sudan",
                            "Suriname",
                            "Svalbard and Jan Mayen",
                            "Eswatini",
                            "Sweden",
                            "Switzerland",
                            "Syrian Arab Republic",
                            "Taiwan (ROC)",
                            "Tajikistan",
                            "Tanzania, United Republic of",
                            "Thailand",
                            "Timor-leste",
                            "Togo",
                            "Tokelau",
                            "Tonga",
                            "Trinidad and Tobago",
                            "Tunisia",
                            "Turkey",
                            "Turkmenistan",
                            "Turks and Caicos Islands",
                            "Tuvalu",
                            "Uganda",
                            "Ukraine",
                            "United Arab Emirates",
                            "United Kingdom",
                            "United States",
                            "United States Minor Outlying Islands",
                            "Uruguay",
                            "Uzbekistan",
                            "Vanuatu",
                            "Venezuela",
                            "Vietnam",
                            "Virgin Islands, British",
                            "Virgin Islands, U.S.",
                            "Wallis and Futuna",
                            "Western Sahara",
                            "Yemen",
                            "Zambia",
                            "Zimbabwe"
                          },
                          saveInto: {},
                          searchDisplay: "AUTO",
                          validations: {}
                        )
                      }
                    )
                  },
                  marginAbove: "STANDARD",
                  marginBelow: "STANDARD",
                  stackWhen: { "PHONE" }
                ),
                a!columnsLayout(
                  columns: {
                    a!columnLayout(
                      contents: {
                        a!textField(
                          label: "Organization Name",
                          labelPosition: "ABOVE",
                          saveInto: {},
                          refreshAfter: "UNFOCUS",
                          validations: {}
                        )
                      }
                    ),
                    a!columnLayout(
                      contents: {
                        a!textField(
                          label: "Job Title",
                          labelPosition: "ABOVE",
                          saveInto: {},
                          refreshAfter: "UNFOCUS",
                          validations: {}
                        )
                      }
                    )
                  },
                  marginAbove: "STANDARD",
                  marginBelow: "STANDARD",
                  stackWhen: { "PHONE" }
                )
              }
            ),
            a!cardLayout(
              contents: {
                a!sectionLayout(
                  label: "YOUR INTERESTS",
                  labelSize: "SMALL",
                  labelHeadingTag: "H3",
                  labelColor: "STANDARD",
                  contents: {
                    a!columnsLayout(
                      columns: {
                        a!columnLayout(
                          contents: {
                            a!checkboxField(
                              label: "",
                              labelPosition: "COLLAPSED",
                              choiceLabels: { "Climate change and carbon emissions" },
                              choiceValues: { 1 },
                              saveInto: {},
                              validations: {}
                            )
                          }
                        ),
                        a!columnLayout(
                          contents: {
                            a!checkboxField(
                              label: "",
                              labelPosition: "COLLAPSED",
                              choiceLabels: { "Air and water pollution" },
                              choiceValues: { 1 },
                              saveInto: {},
                              validations: {}
                            )
                          }
                        )
                      },
                      marginAbove: "STANDARD",
                      marginBelow: "STANDARD",
                      stackWhen: { "PHONE" }
                    ),
                    a!columnsLayout(
                      columns: {
                        a!columnLayout(
                          contents: {
                            a!checkboxField(
                              label: "",
                              labelPosition: "COLLAPSED",
                              choiceLabels: { "Biodiversity" },
                              choiceValues: { 1 },
                              saveInto: {},
                              validations: {}
                            )
                          }
                        ),
                        a!columnLayout(
                          contents: {
                            a!checkboxField(
                              label: "",
                              labelPosition: "COLLAPSED",
                              choiceLabels: { "Deforestation" },
                              choiceValues: { 1 },
                              saveInto: {},
                              validations: {}
                            )
                          }
                        )
                      },
                      marginAbove: "STANDARD",
                      marginBelow: "STANDARD",
                      stackWhen: { "PHONE" }
                    ),
                    a!columnsLayout(
                      columns: {
                        a!columnLayout(
                          contents: {
                            a!checkboxField(
                              label: "",
                              labelPosition: "COLLAPSED",
                              choiceLabels: { "Energy efficiency" },
                              choiceValues: { 1 },
                              saveInto: {},
                              validations: {}
                            )
                          }
                        ),
                        a!columnLayout(
                          contents: {
                            a!checkboxField(
                              label: "",
                              labelPosition: "COLLAPSED",
                              choiceLabels: { "Water scarcity" },
                              choiceValues: { 1 },
                              saveInto: {},
                              validations: {}
                            )
                          }
                        )
                      },
                      marginAbove: "STANDARD",
                      marginBelow: "STANDARD",
                      stackWhen: { "PHONE" }
                    ),
                    a!columnsLayout(
                      columns: {
                        a!columnLayout(
                          contents: {
                            a!checkboxField(
                              label: "",
                              labelPosition: "COLLAPSED",
                              choiceLabels: { "Community relations" },
                              choiceValues: { 1 },
                              saveInto: {},
                              validations: {}
                            )
                          }
                        ),
                        a!columnLayout(
                          contents: {
                            a!checkboxField(
                              label: "",
                              labelPosition: "COLLAPSED",
                              choiceLabels: { "Gender and diversity" },
                              choiceValues: { 1 },
                              saveInto: {},
                              validations: {}
                            )
                          }
                        )
                      },
                      marginAbove: "STANDARD",
                      marginBelow: "STANDARD",
                      stackWhen: { "PHONE" }
                    ),
                    a!columnsLayout(
                      columns: {
                        a!columnLayout(
                          contents: {
                            a!checkboxField(
                              label: "",
                              labelPosition: "COLLAPSED",
                              choiceLabels: { "Data protection and privacy" },
                              choiceValues: { 1 },
                              saveInto: {},
                              validations: {}
                            )
                          }
                        ),
                        a!columnLayout(
                          contents: {
                            a!checkboxField(
                              label: "",
                              labelPosition: "COLLAPSED",
                              choiceLabels: { "Labor standards" },
                              choiceValues: { 1 },
                              saveInto: {},
                              validations: {}
                            )
                          }
                        )
                      },
                      marginAbove: "STANDARD",
                      marginBelow: "STANDARD",
                      stackWhen: { "PHONE" }
                    )
                  }
                )
              },
              height: "AUTO",
              style: "#f2ede1",
              padding: "STANDARD",
              marginAbove: "STANDARD",
              marginBelow: "STANDARD",
              showBorder: false,
              decorativeBarColor: "#1d659c"
            ),
            a!buttonArrayLayout(
              buttons: {
                a!buttonWidget(
                  label: "Register",
                  icon: "arrow-right",
                  style: "SOLID"
                )
              },
              align: "END",
              marginAbove: "STANDARD"
            )
          },
          width: "WIDE"
        ),
        a!columnLayout(contents: {})
      },
      stackWhen: {
        "PHONE",
        "TABLET_PORTRAIT",
        "TABLET_LANDSCAPE"
      }
    )
  },
  backgroundColor: "#f8f6f0"
)
