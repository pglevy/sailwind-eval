a!headerContentLayout(
  header: {
    a!cardLayout(
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
                      altText: "Insurecorp Logo"
                    )
                  },
                  size: "MEDIUM",
                  isThumbnail: false,
                  style: "STANDARD"
                ),
                a!columnsLayout(
                  columns: {
                    a!columnLayout(
                      contents: {
                        a!imageField(
                          label: "",
                          labelPosition: "COLLAPSED",
                          /* This is a placeholder image; replace as needed */
                          images: {
                            a!documentImage(
                              document: a!EXAMPLE_DOCUMENT_IMAGE(),
                              altText: "Illustration of automobile"
                            )
                          },
                          size: if(
                            a!isPageWidth({ "PHONE" }),
                            "MEDIUM",
                            "LARGE"
                          ),
                          isThumbnail: false,
                          style: "STANDARD",
                          align: "START"
                        )
                      },
                      width: "MEDIUM",
                      showWhen: a!isPageWidth({ "PHONE", "TABLET_PORTRAIT" })
                    ),
                    a!columnLayout(
                      contents: {
                        a!richTextDisplayField(
                          labelPosition: "COLLAPSED",
                          value: {
                            a!richTextItem(
                              text: { "Welcome back, Karen!" },
                              size: "LARGE",
                              style: { "STRONG" }
                            ),
                            char(10),
                            char(10),
                            a!richTextItem(
                              text: {
                                "Please review your personalized insurance quote."
                              },
                              color: "#ffe599",
                              size: "MEDIUM_PLUS"
                            )
                          }
                        ),
                        a!sideBySideLayout(
                          items: {
                            a!sideBySideItem(
                              item: a!buttonArrayLayout(
                                buttons: {
                                  a!buttonWidget(
                                    label: "Purchase Now",
                                    size: "LARGE",
                                    style: "OUTLINE"
                                  )
                                },
                                align: "START",
                                marginAbove: "NONE",
                                marginBelow: "NONE"
                              ),
                              width: "MINIMIZE"
                            ),
                            a!sideBySideItem(
                              item: a!richTextDisplayField(
                                labelPosition: "COLLAPSED",
                                value: {
                                  a!richTextItem(text: { "Or, " }, size: "MEDIUM"),
                                  a!richTextItem(
                                    text: { "start a new quote" },
                                    color: "#ffffff",
                                    size: "MEDIUM",
                                    style: { "UNDERLINE" }
                                  )
                                }
                              )
                            )
                          },
                          alignVertical: "MIDDLE",
                          marginAbove: "MORE"
                        )
                      }
                    ),
                    a!columnLayout(
                      contents: {
                        a!imageField(
                          label: "",
                          labelPosition: "COLLAPSED",
                          /* This is a placeholder image; replace as needed */
                          images: {
                            a!documentImage(
                              document: a!EXAMPLE_DOCUMENT_IMAGE(),
                              altText: "Illustration of automobile"
                            )
                          },
                          size: "FIT",
                          isThumbnail: false,
                          style: "STANDARD",
                          align: "END"
                        )
                      },
                      width: "MEDIUM",
                      showWhen: not(
                        a!isPageWidth({ "PHONE", "TABLET_PORTRAIT" })
                      )
                    )
                  },
                  alignVertical: "MIDDLE",
                  stackWhen: { "PHONE", "TABLET_PORTRAIT" }
                )
              },
              width: "WIDE_PLUS"
            ),
            a!columnLayout(contents: {})
          },
          marginBelow: "MORE",
          stackWhen: { "PHONE", "TABLET_PORTRAIT" }
        )
      },
      height: "AUTO",
      style: "#1155cc",
      marginBelow: "NONE",
      showBorder: false
    ),
    a!cardLayout(
      contents: {
        a!columnsLayout(
          columns: {
            a!columnLayout(contents: {}),
            a!columnLayout(
              contents: {
                a!columnsLayout(
                  columns: {
                    a!columnLayout(
                      contents: {
                        a!cardLayout(
                          contents: {
                            a!richTextDisplayField(
                              labelPosition: "COLLAPSED",
                              value: {
                                a!richTextItem(
                                  text: { "Your coverage details" },
                                  size: "LARGE"
                                )
                              },
                              marginBelow: "MORE"
                            ),
                            a!cardLayout(
                              contents: {
                                a!sideBySideLayout(
                                  items: {
                                    a!sideBySideItem(
                                      item: a!richTextDisplayField(
                                        labelPosition: "COLLAPSED",
                                        value: {
                                          a!richTextItem(
                                            text: {
                                              a!richTextItem(text: { "$113.50" }, style: { "STRONG" }),
                                              " "
                                            },
                                            size: "LARGE"
                                          ),
                                          a!richTextItem(text: { "/ Month" }, size: "MEDIUM")
                                        }
                                      )
                                    ),
                                    a!sideBySideItem(
                                      item: a!richTextDisplayField(
                                        labelPosition: "COLLAPSED",
                                        value: {
                                          a!richTextItem(text: { "– or –" }, size: "MEDIUM")
                                        }
                                      ),
                                      width: "MINIMIZE"
                                    ),
                                    a!sideBySideItem(
                                      item: a!richTextDisplayField(
                                        labelPosition: "COLLAPSED",
                                        value: {
                                          a!richTextItem(
                                            text: {
                                              a!richTextItem(text: { "$646.95" }, style: { "STRONG" }),
                                              " "
                                            },
                                            size: "LARGE"
                                          ),
                                          a!richTextItem(text: { "/ 6 Mos*" }, size: "MEDIUM")
                                        },
                                        align: if(
                                          a!isPageWidth({ "TABLET_LANDSCAPE", "PHONE" }),
                                          "LEFT",
                                          "RIGHT"
                                        )
                                      )
                                    )
                                  },
                                  alignVertical: "MIDDLE",
                                  marginBelow: "NONE",
                                  stackWhen: { "TABLET_LANDSCAPE", "PHONE" }
                                ),
                                a!richTextDisplayField(
                                  labelPosition: "COLLAPSED",
                                  value: {
                                    a!richTextItem(
                                      text: { "*With prepayment discount" },
                                      color: "SECONDARY",
                                      size: "SMALL"
                                    )
                                  },
                                  align: if(
                                    a!isPageWidth({ "TABLET_LANDSCAPE", "PHONE" }),
                                    "LEFT",
                                    "RIGHT"
                                  ),
                                  marginAbove: "NONE"
                                )
                              },
                              height: "AUTO",
                              style: "NONE",
                              padding: "STANDARD",
                              marginBelow: "STANDARD",
                              showBorder: true,
                              showShadow: false,
                              decorativeBarPosition: "TOP",
                              decorativeBarColor: "ACCENT"
                            ),
                            a!richTextDisplayField(
                              labelPosition: "COLLAPSED",
                              value: {
                                a!richTextItem(text: { "Auto Insurance" }, size: "MEDIUM")
                              }
                            ),
                            a!cardLayout(
                              contents: {
                                a!sectionLayout(
                                  label: "",
                                  contents: {
                                    a!sideBySideLayout(
                                      items: {
                                        a!sideBySideItem(
                                          item: a!richTextDisplayField(
                                            labelPosition: "COLLAPSED",
                                            value: {
                                              a!richTextIcon(
                                                icon: "hand-holding-usd",
                                                size: "MEDIUM_PLUS"
                                              )
                                            }
                                          ),
                                          width: "MINIMIZE"
                                        ),
                                        a!sideBySideItem(
                                          item: a!richTextDisplayField(
                                            labelPosition: "COLLAPSED",
                                            value: {
                                              a!richTextItem(text: { "3 discounts" }, size: "MEDIUM")
                                            }
                                          ),
                                          width: "AUTO"
                                        ),
                                        a!sideBySideItem(
                                          item: a!richTextDisplayField(
                                            labelPosition: "COLLAPSED",
                                            value: {
                                              a!richTextItem(
                                                text: { "$42.90/mo" },
                                                color: "#38761d",
                                                size: "MEDIUM",
                                                style: { "STRONG" }
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
                                                text: {
                                                  a!richTextIcon(icon: "angle-right-bold")
                                                },
                                                color: "STANDARD",
                                                size: "MEDIUM",
                                                style: { "STRONG" }
                                              )
                                            }
                                          ),
                                          width: "MINIMIZE"
                                        )
                                      },
                                      alignVertical: "MIDDLE"
                                    )
                                  },
                                  marginBelow: "NONE"
                                )
                              },
                              link: a!dynamicLink(label: "Dynamic Link", saveInto: {}),
                              height: "AUTO",
                              style: "NONE",
                              marginBelow: "STANDARD"
                            ),
                            a!cardLayout(
                              contents: {
                                a!sectionLayout(
                                  label: "",
                                  contents: {
                                    a!sideBySideLayout(
                                      items: {
                                        a!sideBySideItem(
                                          item: a!richTextDisplayField(
                                            labelPosition: "COLLAPSED",
                                            value: {
                                              a!richTextIcon(icon: "car", size: "MEDIUM_PLUS")
                                            }
                                          ),
                                          width: "MINIMIZE"
                                        ),
                                        a!sideBySideItem(
                                          item: a!richTextDisplayField(
                                            labelPosition: "COLLAPSED",
                                            value: {
                                              a!richTextItem(text: { "2 vehicles" }, size: "MEDIUM")
                                            }
                                          ),
                                          width: "AUTO"
                                        ),
                                        a!sideBySideItem(
                                          item: a!richTextDisplayField(
                                            labelPosition: "COLLAPSED",
                                            value: {
                                              a!richTextItem(
                                                text: {
                                                  a!richTextIcon(icon: "angle-right-bold")
                                                },
                                                color: "STANDARD",
                                                size: "MEDIUM",
                                                style: { "STRONG" }
                                              )
                                            }
                                          ),
                                          width: "MINIMIZE"
                                        )
                                      },
                                      alignVertical: "MIDDLE"
                                    )
                                  },
                                  marginBelow: "NONE"
                                )
                              },
                              link: a!dynamicLink(label: "Dynamic Link", saveInto: {}),
                              height: "AUTO",
                              style: "NONE",
                              marginBelow: "STANDARD"
                            ),
                            a!cardLayout(
                              contents: {
                                a!sectionLayout(
                                  label: "",
                                  contents: {
                                    a!sideBySideLayout(
                                      items: {
                                        a!sideBySideItem(
                                          item: a!richTextDisplayField(
                                            labelPosition: "COLLAPSED",
                                            value: {
                                              a!richTextIcon(icon: "user-friends", size: "MEDIUM_PLUS")
                                            }
                                          ),
                                          width: "MINIMIZE"
                                        ),
                                        a!sideBySideItem(
                                          item: a!richTextDisplayField(
                                            labelPosition: "COLLAPSED",
                                            value: {
                                              a!richTextItem(text: { "2 drivers" }, size: "MEDIUM")
                                            }
                                          ),
                                          width: "AUTO"
                                        ),
                                        a!sideBySideItem(
                                          item: a!richTextDisplayField(
                                            labelPosition: "COLLAPSED",
                                            value: {
                                              a!richTextItem(
                                                text: {
                                                  a!richTextIcon(icon: "angle-right-bold")
                                                },
                                                color: "STANDARD",
                                                size: "MEDIUM",
                                                style: { "STRONG" }
                                              )
                                            }
                                          ),
                                          width: "MINIMIZE"
                                        )
                                      },
                                      alignVertical: "MIDDLE"
                                    )
                                  },
                                  marginBelow: "NONE"
                                )
                              },
                              link: a!dynamicLink(label: "Dynamic Link", saveInto: {}),
                              height: "AUTO",
                              style: "NONE",
                              marginBelow: "STANDARD"
                            ),
                            a!cardLayout(
                              contents: {
                                a!sectionLayout(
                                  label: "",
                                  contents: {
                                    a!sideBySideLayout(
                                      items: {
                                        a!sideBySideItem(
                                          item: a!richTextDisplayField(
                                            labelPosition: "COLLAPSED",
                                            value: {
                                              a!richTextIcon(icon: "umbrella", size: "MEDIUM_PLUS")
                                            }
                                          ),
                                          width: "MINIMIZE"
                                        ),
                                        a!sideBySideItem(
                                          item: a!richTextDisplayField(
                                            labelPosition: "COLLAPSED",
                                            value: {
                                              a!richTextItem(text: { "Coverage" }, size: "MEDIUM")
                                            }
                                          ),
                                          width: "AUTO"
                                        ),
                                        a!sideBySideItem(
                                          item: a!richTextDisplayField(
                                            labelPosition: "COLLAPSED",
                                            value: {
                                              a!richTextItem(
                                                text: { a!richTextIcon(icon: "angle-down-bold") },
                                                color: "STANDARD",
                                                size: "MEDIUM",
                                                style: { "STRONG" }
                                              )
                                            }
                                          ),
                                          width: "MINIMIZE"
                                        )
                                      },
                                      alignVertical: "MIDDLE"
                                    )
                                  },
                                  divider: "NONE",
                                  marginBelow: "NONE"
                                )
                              },
                              link: a!dynamicLink(label: "Dynamic Link", saveInto: {}),
                              height: "AUTO",
                              style: "NONE",
                              marginBelow: "NONE",
                              showShadow: false
                            ),
                            a!cardLayout(
                              contents: {
                                a!sectionLayout(
                                  label: "",
                                  contents: {
                                    a!sideBySideLayout(
                                      items: {
                                        a!sideBySideItem(
                                          item: a!richTextDisplayField(
                                            labelPosition: "COLLAPSED",
                                            value: {
                                              a!richTextItem(
                                                text: { "Bodily Injury Liability" },
                                                style: { "STRONG" }
                                              ),
                                              char(10),
                                              "$50,000/person",
                                              char(10),
                                              "$100,000/accident"
                                            }
                                          )
                                        ),
                                        a!sideBySideItem(
                                          item: a!buttonArrayLayout(
                                            buttons: {
                                              a!buttonWidget(label: "Edit", style: "OUTLINE", color: "SECONDARY")
                                            },
                                            align: "START",
                                            marginBelow: "NONE"
                                          ),
                                          width: "MINIMIZE"
                                        )
                                      },
                                      alignVertical: "TOP"
                                    )
                                  },
                                  divider: "BELOW"
                                ),
                                a!sectionLayout(
                                  label: "",
                                  contents: {
                                    a!sideBySideLayout(
                                      items: {
                                        a!sideBySideItem(
                                          item: a!richTextDisplayField(
                                            labelPosition: "COLLAPSED",
                                            value: {
                                              a!richTextItem(
                                                text: {
                                                  "Uninsured/Underinsured Motorist Bodily Injury Liability"
                                                },
                                                style: { "STRONG" }
                                              ),
                                              char(10),
                                              "$50,000/person",
                                              char(10),
                                              "$100,000/accident"
                                            }
                                          )
                                        ),
                                        a!sideBySideItem(
                                          item: a!buttonArrayLayout(
                                            buttons: {
                                              a!buttonWidget(label: "Edit", style: "OUTLINE", color: "SECONDARY")
                                            },
                                            align: "START",
                                            marginBelow: "NONE"
                                          ),
                                          width: "MINIMIZE"
                                        )
                                      },
                                      alignVertical: "TOP"
                                    )
                                  },
                                  divider: "BELOW"
                                ),
                                a!sectionLayout(
                                  label: "",
                                  contents: {
                                    a!sideBySideLayout(
                                      items: {
                                        a!sideBySideItem(
                                          item: a!richTextDisplayField(
                                            labelPosition: "COLLAPSED",
                                            value: {
                                              a!richTextItem(
                                                text: { "Property Damage Liability" },
                                                style: { "STRONG" }
                                              ),
                                              char(10),
                                              "$75,000/accident"
                                            }
                                          )
                                        ),
                                        a!sideBySideItem(
                                          item: a!buttonArrayLayout(
                                            buttons: {
                                              a!buttonWidget(label: "Edit", style: "OUTLINE", color: "SECONDARY")
                                            },
                                            align: "START",
                                            marginBelow: "NONE"
                                          ),
                                          width: "MINIMIZE"
                                        )
                                      },
                                      alignVertical: "TOP"
                                    )
                                  },
                                  divider: "BELOW"
                                ),
                                a!sectionLayout(
                                  label: "",
                                  contents: {
                                    a!sideBySideLayout(
                                      items: {
                                        a!sideBySideItem(
                                          item: a!richTextDisplayField(
                                            labelPosition: "COLLAPSED",
                                            value: {
                                              a!richTextItem(
                                                text: { "Medical Payments" },
                                                style: { "STRONG" }
                                              ),
                                              char(10),
                                              "$25,000/person",
                                              char(10),
                                              "$50,000/accident"
                                            }
                                          )
                                        ),
                                        a!sideBySideItem(
                                          item: a!buttonArrayLayout(
                                            buttons: {
                                              a!buttonWidget(label: "Edit", style: "OUTLINE", color: "SECONDARY")
                                            },
                                            align: "START",
                                            marginBelow: "NONE"
                                          ),
                                          width: "MINIMIZE"
                                        )
                                      },
                                      alignVertical: "TOP"
                                    )
                                  },
                                  divider: "NONE"
                                )
                              },
                              height: "AUTO",
                              style: "NONE",
                              marginBelow: "STANDARD"
                            )
                          },
                          height: "AUTO",
                          style: "NONE",
                          shape: "SEMI_ROUNDED",
                          padding: "STANDARD",
                          marginBelow: "NONE",
                          showBorder: false
                        )
                      },
                      width: "AUTO"
                    ),
                    a!columnLayout(
                      contents: {
                        a!cardLayout(
                          contents: {
                            a!richTextDisplayField(
                              labelPosition: "COLLAPSED",
                              value: {
                                a!richTextItem(text: { "Your discounts" }, size: "LARGE")
                              },
                              marginBelow: "MORE"
                            ),
                            a!cardLayout(
                              contents: {
                                a!sideBySideLayout(
                                  items: {
                                    a!sideBySideItem(
                                      item: a!stampField(
                                        labelPosition: "COLLAPSED",
                                        icon: "car",
                                        backgroundColor: "#674ea7",
                                        contentColor: "STANDARD",
                                        size: "TINY"
                                      ),
                                      width: "MINIMIZE"
                                    ),
                                    a!sideBySideItem(
                                      item: a!richTextDisplayField(
                                        labelPosition: "COLLAPSED",
                                        value: {
                                          a!richTextItem(text: { "$180.90 " }, size: "MEDIUM_PLUS"),
                                          a!richTextItem(text: { "/ Year" }, size: "MEDIUM"),
                                          char(10),
                                          a!richTextItem(
                                            text: { "Multi-Vehicle Discount" },
                                            size: "MEDIUM"
                                          )
                                        }
                                      )
                                    )
                                  },
                                  alignVertical: "MIDDLE"
                                )
                              },
                              height: "AUTO",
                              style: "NONE",
                              marginBelow: "STANDARD",
                              decorativeBarPosition: "TOP",
                              decorativeBarColor: "#674ea7"
                            ),
                            a!cardLayout(
                              contents: {
                                a!sideBySideLayout(
                                  items: {
                                    a!sideBySideItem(
                                      item: a!stampField(
                                        labelPosition: "COLLAPSED",
                                        icon: "user-friends",
                                        backgroundColor: "#e69138",
                                        contentColor: "#ffffff",
                                        size: "TINY"
                                      ),
                                      width: "MINIMIZE"
                                    ),
                                    a!sideBySideItem(
                                      item: a!richTextDisplayField(
                                        labelPosition: "COLLAPSED",
                                        value: {
                                          a!richTextItem(text: { "$143.25 " }, size: "MEDIUM_PLUS"),
                                          a!richTextItem(text: { "/ Year" }, size: "MEDIUM"),
                                          char(10),
                                          a!richTextItem(
                                            text: { "Multi-Driver Discount" },
                                            size: "MEDIUM"
                                          )
                                        }
                                      )
                                    )
                                  },
                                  alignVertical: "MIDDLE"
                                )
                              },
                              height: "AUTO",
                              style: "NONE",
                              marginBelow: "STANDARD",
                              decorativeBarPosition: "TOP",
                              decorativeBarColor: "#e69138"
                            ),
                            a!cardLayout(
                              contents: {
                                a!sideBySideLayout(
                                  items: {
                                    a!sideBySideItem(
                                      item: a!stampField(
                                        labelPosition: "COLLAPSED",
                                        icon: "thumbs-up",
                                        backgroundColor: "#6aa84f",
                                        contentColor: "#ffffff",
                                        size: "TINY"
                                      ),
                                      width: "MINIMIZE"
                                    ),
                                    a!sideBySideItem(
                                      item: a!richTextDisplayField(
                                        labelPosition: "COLLAPSED",
                                        value: {
                                          a!richTextItem(text: { "$211.60 " }, size: "MEDIUM_PLUS"),
                                          a!richTextItem(text: { "/ Year" }, size: "MEDIUM"),
                                          char(10),
                                          a!richTextItem(
                                            text: { "Safe Driving Discount" },
                                            size: "MEDIUM"
                                          )
                                        }
                                      )
                                    )
                                  },
                                  alignVertical: "MIDDLE"
                                )
                              },
                              height: "AUTO",
                              style: "NONE",
                              marginBelow: "STANDARD",
                              decorativeBarPosition: "TOP",
                              decorativeBarColor: "#6aa84f"
                            )
                          },
                          height: "AUTO",
                          style: "NONE",
                          shape: "SEMI_ROUNDED",
                          padding: "STANDARD",
                          marginBelow: "MORE",
                          showBorder: false
                        ),
                        a!cardLayout(
                          contents: {
                            a!richTextDisplayField(
                              labelPosition: "COLLAPSED",
                              value: {
                                a!richTextItem(text: { "Your savings" }, size: "LARGE")
                              },
                              marginBelow: "MORE"
                            ),
                            a!gaugeField(
                              labelPosition: "COLLAPSED",
                              percentage: 24.0,
                              primaryText: a!gaugePercentage()
                            ),
                            a!richTextDisplayField(
                              labelPosition: "COLLAPSED",
                              value: {
                                "You can get our award-winning service while enjoying a premium that's ",
                                a!richTextItem(text: { "24% lower" }, style: { "STRONG" }),
                                " than the average for other drivers in your area."
                              },
                              marginBelow: "STANDARD"
                            )
                          },
                          height: "AUTO",
                          style: "NONE",
                          shape: "SEMI_ROUNDED",
                          padding: "STANDARD",
                          marginBelow: "STANDARD",
                          showBorder: false
                        )
                      },
                      width: "MEDIUM"
                    )
                  },
                  stackWhen: { "PHONE", "TABLET_PORTRAIT" }
                )
              },
              width: "WIDE_PLUS"
            ),
            a!columnLayout(contents: {})
          },
          stackWhen: { "PHONE", "TABLET_PORTRAIT" }
        ),
        a!columnsLayout(
          columns: {
            a!columnLayout(contents: {}),
            a!columnLayout(contents: {})
          },
          marginAbove: "EVEN_MORE",
          marginBelow: "EVEN_MORE",
          stackWhen: {
            "PHONE",
            "TABLET_PORTRAIT",
            "TABLET_LANDSCAPE",
            "DESKTOP_NARROW"
          }
        )
      },
      height: "AUTO",
      style: "#1155cc",
      marginBelow: "NONE",
      showBorder: false
    ),
    a!cardLayout(
      contents: {
        a!columnsLayout(
          columns: {
            a!columnLayout(
              contents: {
                a!imageField(
                  label: "",
                  labelPosition: "COLLAPSED",
                  /* This is a placeholder image; replace as needed */
                  images: {
                    a!documentImage(document: a!EXAMPLE_DOCUMENT_IMAGE())
                  },
                  size: "MEDIUM",
                  isThumbnail: false,
                  style: "STANDARD"
                )
              },
              width: "MEDIUM"
            ),
            a!columnLayout(
              contents: {
                a!richTextDisplayField(
                  labelPosition: "COLLAPSED",
                  value: {
                    "We may use information from public sources or third parties, such as driving records, claim history, vehicle driving data, and credit reports to provide you with the best quote.",
                    char(10),
                    char(10),
                    "Some discounts, coverages, payment plans, and features are not available in all states.",
                    char(10),
                    char(10),
                    "This site exists for demonstration purposes only. We can't actually sell you auto insurance."
                  }
                )
              }
            )
          },
          stackWhen: { "PHONE", "TABLET_PORTRAIT" }
        )
      },
      height: "AUTO",
      style: "#333",
      padding: "EVEN_MORE",
      marginBelow: "STANDARD",
      showBorder: false,
      decorativeBarPosition: "NONE",
      decorativeBarColor: "#056CF2"
    )
  },
  contents: {},
  backgroundColor: "#333"
)
