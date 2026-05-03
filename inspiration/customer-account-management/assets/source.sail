a!headerContentLayout(
  header: {
    a!cardLayout(
      contents: {
        a!cardLayout(
          contents: {
            a!headingField(
              text: "My Account",
              marginBelow: "NONE",
              size: "LARGE_PLUS",
              fontWeight: "BOLD"
            )
          },
          marginBelow: "NONE",
          height: "AUTO",
          style: "#1155cc",
          showBorder: false,
          padding: "MORE"
        )
      },
      marginBelow: "NONE",
      height: "AUTO",
      style: "#fff",
      showBorder: false,
      padding: "NONE"
    )
  },
  contents: {
    a!cardLayout(
      contents: {
        a!tabLayout(
          tabs: {
            a!tabItem(
              label: "Overview",
              contents: {
                a!columnsLayout(
                  columns: {
                    a!columnLayout(
                      contents: {
                        a!sectionLayout(
                          label: "Payment",
                          contents: {
                            a!cardLayout(
                              contents: {
                                a!sectionLayout(
                                  label: "NEXT PAYMENT",
                                  contents: {
                                    a!sideBySideLayout(
                                      items: {
                                        a!sideBySideItem(
                                          item: a!richTextDisplayField(
                                            labelPosition: "COLLAPSED",
                                            value: a!richTextItem(
                                                text: "$123.45",
                                                size: "MEDIUM_PLUS",
                                                style: "STRONG"
                                              )
                                          )
                                        ),
                                        a!sideBySideItem(
                                          item: a!richTextDisplayField(
                                            labelPosition: "COLLAPSED",
                                            value: a!richTextItem(
                                              text: "Due July 1", 
                                              size: "MEDIUM_PLUS"
                                            )
                                          ),
                                          width: "MINIMIZE"
                                        )
                                      },
                                      alignVertical: "MIDDLE"
                                    )
                                  },
                                  labelHeadingTag: "H3",
                                  labelSize: "SMALL",
                                  labelColor: "SECONDARY",
                                  divider: "BELOW"
                                ),
                                a!sectionLayout(
                                  label: "PAYMENT SOURCE",
                                  contents: {
                                    a!sideBySideLayout(
                                      items: {
                                        a!sideBySideItem(
                                          item: a!richTextDisplayField(
                                            labelPosition: "COLLAPSED",
                                            value: a!richTextItem(
                                              text: "Pine Street Bank xxxx3456",
                                              size: "MEDIUM"
                                            )
                                          ),
                                          width: "AUTO"
                                        ),
                                        a!sideBySideItem(
                                          item: a!richTextDisplayField(
                                            labelPosition: "COLLAPSED",
                                            value: a!richTextItem(
                                                text: "Edit",
                                                link: a!safeLink(
                                                  uri: "www.appian.com",
                                                  openLinkIn: "NEW_TAB"
                                                ),
                                                linkStyle: "STANDALONE"
                                              )
                                          ),
                                          width: "MINIMIZE"
                                        )
                                      },
                                      alignVertical: "MIDDLE"
                                    ),
                                    a!sideBySideLayout(
                                      items: {
                                        a!sideBySideItem(
                                          item: a!tagField(
                                            label: "Tag Field",
                                            labelPosition: "COLLAPSED",
                                            tags: {
                                              a!tagItem(
                                                text: "AUTOPAY",
                                                backgroundColor: "#1155cc"
                                              )
                                            }
                                          ),
                                          width: "MINIMIZE"
                                        ),
                                        a!sideBySideItem(
                                          item: a!richTextDisplayField(
                                            labelPosition: "COLLAPSED",
                                            value: a!richTextItem(
                                              text: "Withdraw balance due each month on due date",
                                              color: "SECONDARY"
                                            )
                                          )
                                        )
                                      },
                                      alignVertical: "MIDDLE"
                                    )
                                  },
                                  labelHeadingTag: "H3",
                                  marginBelow: "NONE",
                                  labelSize: "SMALL",
                                  labelColor: "SECONDARY",
                                  divider: "NONE"
                                )
                              },
                              marginBelow: "STANDARD",
                              height: "AUTO",
                              style: "NONE",
                              showShadow: true,
                              showBorder: false,
                              padding: "STANDARD"
                            )
                          },
                          isCollapsible: false,
                          labelHeadingTag: "H2",
                          marginBelow: "MORE",
                          labelSize: "MEDIUM",
                          labelColor: "STANDARD"
                        ),
                        a!sectionLayout(
                          label: "Insured Drivers",
                          contents: {
                            a!cardLayout(
                              contents: {
                                a!sectionLayout(
                                  label: "PRIMARY",
                                  contents: {
                                    a!sideBySideLayout(
                                      items: {
                                        a!sideBySideItem(
                                          item: a!stampField(
                                            labelPosition: "COLLAPSED",
                                            text: "J",
                                            size: "TINY",
                                            backgroundColor: "#e12e8b",
                                            contentColor: "STANDARD"
                                          ),
                                          width: "MINIMIZE"
                                        ),
                                        a!sideBySideItem(
                                          item: {
                                            a!richTextDisplayField(
                                              labelPosition: "COLLAPSED",
                                              value: a!richTextItem(
                                                  text: "Jane",
                                                  size: "MEDIUM_PLUS",
                                                  style: "STRONG"
                                                )
                                            ),
                                            a!richTextDisplayField(
                                              labelPosition: "COLLAPSED",
                                              value: a!richTextItem(
                                                text: "44-year-old female",
                                                size: "MEDIUM"
                                              )
                                            )
                                          }
                                        ),
                                        a!sideBySideItem(
                                          item: {
                                            a!richTextDisplayField(
                                              labelPosition: "COLLAPSED",
                                              value: a!richTextItem(
                                                  text: "Edit",
                                                  link: a!safeLink(
                                                    uri: "appian.com", 
                                                    openLinkIn: "NEW_TAB"
                                                  ),
                                                  linkStyle: "STANDALONE"
                                                ),
                                              align: "RIGHT"
                                            )
                                          }
                                        )
                                      },
                                      marginBelow: "NONE",
                                      alignVertical: "MIDDLE"
                                    )
                                  },
                                  labelSize: "SMALL",
                                  labelColor: "SECONDARY",
                                  divider: "BELOW"
                                ),
                                a!sectionLayout(
                                  label: "SPOUSE",
                                  contents: {
                                    a!sideBySideLayout(
                                      items: {
                                        a!sideBySideItem(
                                          item: a!stampField(
                                            labelPosition: "COLLAPSED",
                                            text: "S",
                                            size: "TINY",
                                            backgroundColor: "#118bf1",
                                            contentColor: "STANDARD"
                                          ),
                                          width: "MINIMIZE"
                                        ),
                                        a!sideBySideItem(
                                          item: {
                                            a!richTextDisplayField(
                                              labelPosition: "COLLAPSED",
                                              value: {
                                                a!richTextItem(
                                                  text: "Sharif",
                                                  size: "MEDIUM_PLUS",
                                                  style: "STRONG"
                                                )
                                              }
                                            ),
                                            a!richTextDisplayField(
                                              labelPosition: "COLLAPSED",
                                              value: a!richTextItem(
                                                text: "42-year-old male", 
                                                size: "MEDIUM"
                                              )
                                            )
                                          }
                                        ),
                                        a!sideBySideItem(
                                          item: {
                                            a!richTextDisplayField(
                                              labelPosition: "COLLAPSED",
                                              value: a!richTextItem(
                                                  text: "Edit",
                                                  link: a!safeLink(
                                                    uri: "appian.com", 
                                                    openLinkIn: "NEW_TAB"
                                                  ),
                                                  linkStyle: "STANDALONE"
                                                ),
                                              align: "RIGHT"
                                            )
                                          }
                                        )
                                      },
                                      marginBelow: "NONE",
                                      alignVertical: "MIDDLE"
                                    )
                                  },
                                  labelSize: "SMALL",
                                  labelColor: "SECONDARY",
                                  divider: "BELOW"
                                ),
                                a!sectionLayout(
                                  label: "DEPENDENT CHILD",
                                  contents: {
                                    a!sideBySideLayout(
                                      items: {
                                        a!sideBySideItem(
                                          item: a!stampField(
                                            labelPosition: "COLLAPSED",
                                            text: "B",
                                            size: "TINY",
                                            backgroundColor: "#569a38",
                                            contentColor: "STANDARD"
                                          ),
                                          width: "MINIMIZE"
                                        ),
                                        a!sideBySideItem(
                                          item: {
                                            a!richTextDisplayField(
                                              labelPosition: "COLLAPSED",
                                              value: a!richTextItem(
                                                text: "Benjamin",
                                                size: "MEDIUM_PLUS",
                                                style: "STRONG"
                                              )
                                            ),
                                            a!richTextDisplayField(
                                              labelPosition: "COLLAPSED",
                                              value: a!richTextItem(
                                                text: "16-year-old male", 
                                                size: "MEDIUM"
                                              )
                                            )
                                          }
                                        ),
                                        a!sideBySideItem(
                                          item: {
                                            a!richTextDisplayField(
                                              labelPosition: "COLLAPSED",
                                              value: a!richTextItem(
                                                text: "Edit",
                                                link: a!safeLink(
                                                  uri: "appian.com", 
                                                  openLinkIn: "NEW_TAB"
                                                ),
                                                linkStyle: "STANDALONE"
                                              ),
                                              align: "RIGHT"
                                            )
                                          }
                                        )
                                      },
                                      marginBelow: "NONE",
                                      alignVertical: "MIDDLE"
                                    )
                                  },
                                  marginBelow: "NONE",
                                  labelSize: "SMALL",
                                  labelColor: "SECONDARY",
                                  divider: "NONE"
                                )
                              },
                              marginBelow: "STANDARD",
                              height: "AUTO",
                              style: "NONE",
                              showShadow: true,
                              showBorder: false,
                              padding: "STANDARD"
                            )
                          },
                          labelHeadingTag: "H2",
                          marginBelow: "MORE",
                          labelSize: "MEDIUM",
                          labelColor: "STANDARD"
                        )
                      },
                      width: "MEDIUM_PLUS"
                    ),
                    a!columnLayout(
                      contents: {
                        a!sectionLayout(
                          label: "Vehicles & Coverage",
                          contents: {
                            a!cardLayout(
                              contents: {
                                a!sectionLayout(
                                  label: "VEHICLE 1",
                                  contents: {
                                    a!columnsLayout(
                                      columns: {
                                        a!columnLayout(
                                          contents: {
                                            a!richTextDisplayField(
                                              labelPosition: "COLLAPSED",
                                              value: {
                                                a!richTextItem(
                                                  text: "2021 Polestar 2",
                                                  size: "MEDIUM_PLUS",
                                                  style: "STRONG"
                                                ),
                                                char(10),
                                                a!richTextItem(
                                                  text: a!richTextItem(
                                                    text: "Edit"
                                                  ),
                                                  link: a!safeLink(
                                                    uri: "www.appian.com",
                                                    openLinkIn: "NEW_TAB"
                                                  ),
                                                  linkStyle: "STANDALONE"
                                                )
                                              }
                                            )
                                          }
                                        ),
                                        a!columnLayout(
                                          contents: {
                                            a!richTextDisplayField(
                                              label: "Comprehensive",
                                              labelPosition: "ABOVE",
                                              value: "$500 Deductible"
                                            ),
                                            a!richTextDisplayField(
                                              label: "Collision",
                                              labelPosition: "ABOVE",
                                              value: "$500 Deductible"
                                            ),
                                            a!richTextDisplayField(
                                              label: "Bodily Injury",
                                              labelPosition: "ABOVE",
                                              value: {
                                                "$250,000 Limit Per Person",
                                                char(10),
                                                "$500,000 Limit Per Incident"
                                              }
                                            ),
                                            a!richTextDisplayField(
                                              label: "Property Damage",
                                              labelPosition: "ABOVE",
                                              value: "$100,000 Limit Per Incident"
                                            ),
                                            a!richTextDisplayField(
                                              labelPosition: "COLLAPSED",
                                              value: a!richTextItem(
                                                text: "Show More",
                                                link: a!safeLink(
                                                  uri: "www.appian.com",
                                                  openLinkIn: "NEW_TAB"
                                                ),
                                                linkStyle: "STANDALONE"
                                              )
                                            )
                                          }
                                        )
                                      }
                                    )
                                  },
                                  labelHeadingTag: "H3",
                                  labelSize: "SMALL",
                                  labelColor: "SECONDARY",
                                  divider: "BELOW"
                                ),
                                a!sectionLayout(
                                  label: "VEHICLE 2",
                                  contents: {
                                    a!columnsLayout(
                                      columns: {
                                        a!columnLayout(
                                          contents: {
                                            a!richTextDisplayField(
                                              labelPosition: "COLLAPSED",
                                              value: {
                                                a!richTextItem(
                                                  text: "2009 Saab 9-5",
                                                  size: "MEDIUM_PLUS",
                                                  style: "STRONG"
                                                ),
                                                char(10),
                                                a!richTextItem(
                                                  text: a!richTextItem(
                                                    text: "Edit", 
                                                    size: "STANDARD"
                                                  ),
                                                  link: a!safeLink(
                                                    uri: "www.appian.com",
                                                    openLinkIn: "NEW_TAB"
                                                  ),
                                                  linkStyle: "STANDALONE"
                                                )
                                              }
                                            )
                                          }
                                        ),
                                        a!columnLayout(
                                          contents: {
                                            a!richTextDisplayField(
                                              label: "Comprehensive",
                                              labelPosition: "ABOVE",
                                              value: "$500 Deductible"
                                            ),
                                            a!richTextDisplayField(
                                              label: "Collision",
                                              labelPosition: "ABOVE",
                                              value: "$500 Deductible"
                                            ),
                                            a!richTextDisplayField(
                                              label: "Bodily Injury",
                                              labelPosition: "ABOVE",
                                              value: {
                                                "$250,000 Limit Per Person",
                                                char(10),
                                                "$500,000 Limit Per Incident"
                                              }
                                            ),
                                            a!richTextDisplayField(
                                              label: "Property Damage",
                                              labelPosition: "ABOVE",
                                              value: "$100,000 Limit Per Incident"
                                            ),
                                            a!richTextDisplayField(
                                              labelPosition: "COLLAPSED",
                                              value: a!richTextItem(
                                                text: "Show More",
                                                link: a!safeLink(
                                                  uri: "www.appian.com",
                                                  openLinkIn: "NEW_TAB"
                                                ),
                                                linkStyle: "STANDALONE"
                                              )
                                            )
                                          }
                                        )
                                      }
                                    )
                                  },
                                  labelHeadingTag: "H3",
                                  marginBelow: "NONE",
                                  labelSize: "SMALL",
                                  labelColor: "SECONDARY",
                                  divider: "NONE"
                                )
                              },
                              marginBelow: "STANDARD",
                              height: "AUTO",
                              style: "NONE",
                              showShadow: true,
                              showBorder: false,
                              padding: "STANDARD"
                            )
                          },
                          labelHeadingTag: "H2",
                          marginBelow: "MORE",
                          labelSize: "MEDIUM",
                          labelColor: "STANDARD"
                        )
                      },
                      width: "WIDE"
                    )
                  },
                  stackWhen: { "PHONE", "TABLET_PORTRAIT" },
                  marginAbove: "NONE",
                  marginBelow: "NONE"
                )
              },
              icon: ""
            ),
            a!tabItem(label: "Claims"),
            a!tabItem(label: "Preferences")
          },
          marginBelow: "NONE",
          contentsPadding: "STANDARD"
        )
      },
      marginBelow: "NONE",
      height: "AUTO",
      style: "TRANSPARENT",
      showBorder: false,
      padding: "LESS"
    )
  },
  backgroundColor: "#FAFCFF",
  contentsPadding: "NONE"
)
