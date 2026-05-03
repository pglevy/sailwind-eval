a!localVariables(
  local!selectedTag: 1,
  a!paneLayout(
    panes: {
      a!pane(
        contents: {
          a!headingField(
            text: "Menu",
            size: "LARGE",
            fontWeight: "SEMI_BOLD"
          ),
          a!richTextDisplayField(
            labelPosition: "COLLAPSED",
            value: {
              a!richTextItem(
                text: "Tuesday, 24 Feb 2025",
                size: "MEDIUM"
              )
            }
          ),
          a!tabLayout(
            tabs: {
              a!tabItem(
                label: "Appetizers",
                contents: {
                  a!cardGroupLayout(
                    cards: a!forEach(
                      items: {
                        a!map(
                          title: "Edamame",
                          description: "Soybeans, steamed tender right in their pods and finished with a light, savory sprinkle of sea salt.",
                          price: "$6.99",
                          image: "https://images.unsplash.com/photo-1730596140741-6cc4963ad816?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1000&h=700&mask=corners&corner-radius=25&crop=center"
                        ),
                        a!map(
                          title: "Gyoza",
                          description: "Pan-fried pork and vegetable dumplings served with a soy-vinegar dipping sauce.",
                          price: "$8.00",
                          image: "https://images.unsplash.com/photo-1588182728399-e8f2df121744?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1000&h=700&crop=center&mask=corners&corner-radius=25"
                        ),
                        a!map(
                          title: "Agedashi Tofu",
                          description: "Lightly fried tofu cubes served in a warm, savory dashi broth with green onions.",
                          price: "$8.50",
                          image: "https://images.unsplash.com/photo-1706468238718-bba7e9b63ad2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1000&h=700&mask=corners&corner-radius=25&crop=center"
                        ),
                        a!map(
                          title: "Seaweed Salad",
                          description: "Chilled and seasoned mixed seaweed with sesame seeds and a light vinegar dressing.",
                          price: "$7.00",
                          image: "https://images.unsplash.com/photo-1561466273-c13f88329aa0?q=80https://images.unsplash.com/photo-1652794131180-7d55e611dbc6?q%3D80&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=1000&h=700&mask=corners&corner-radius=25&crop=center&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        ),
                        a!map(
                          title: "Chicken Karaage",
                          description: "Bite-sized, soy-marinated chicken, lightly battered and fried to a crispy golden brown.",
                          price: "$7.50",
                          image: "https://images.unsplash.com/photo-1705359573945-bcf2d0b70b0b?q=80&w=1000&h=700&mask=corners&corner-radius=25&crop=center&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        ),
                        a!map(
                          title: "Takoyaki",
                          description: "Fried octopus-filled batter balls (5 pieces), drizzled with savory sauce, mayo, and bonito flakes.",
                          price: "$9.00",
                          image: "https://images.unsplash.com/photo-1751094364516-02b351f9c277?q=80&w=1000&h=700&mask=corners&corner-radius=25&crop=center&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        )
                      },
                      expression: {
                        a!cardLayout(
                          contents: {
                            a!imageField(
                              label: "Image",
                              labelPosition: "COLLAPSED",
                              images: a!webImage(source: fv!item.image),
                              marginBelow: "LESS",
                              size: "FIT"
                            ),
                            a!headingField(
                              text: fv!item.title,
                              marginBelow: "EVEN_LESS",
                              size: "MEDIUM"
                            ),
                            a!richTextDisplayField(
                              labelPosition: "COLLAPSED",
                              value: fv!item.description,
                              marginBelow: "EVEN_LESS"
                            ),
                            a!columnsLayout(
                              columns: {
                                a!columnLayout(
                                  contents: {
                                    a!sideBySideLayout(
                                      items: {
                                        a!sideBySideItem(
                                          item: a!richTextDisplayField(
                                            labelPosition: "COLLAPSED",
                                            value: a!richTextItem(
                                              text: fv!item.price,
                                              size: "MEDIUM_PLUS"
                                            ),
                                            marginAbove: "LESS",
                                            marginBelow: "NONE"
                                          )
                                        )
                                      },
                                      alignVertical: "BOTTOM"
                                    )
                                  }
                                ),
                                a!columnLayout(
                                  contents: {
                                    a!buttonArrayLayout(
                                      buttons: {
                                        a!buttonWidget(
                                          icon: "plus", 
                                          style: "OUTLINE")
                                      },
                                      marginAbove: "LESS",
                                      marginBelow: "NONE"
                                    )
                                  },
                                  width: "EXTRA_NARROW"
                                )
                              },
                              marginBelow: "NONE",
                              alignVertical: "MIDDLE",
                              spacing: "DENSE"
                            )
                          },
                          showShadow: true,
                          showBorder: false,
                          padding: "STANDARD",
                          shape: "ROUNDED"
                        )
                      }
                    ),
                    marginAbove: "STANDARD",
                    cardWidth: "NARROW"
                  )
                }
              ),
              a!tabItem(label: "Sushi"),
              a!tabItem(label: "Rice Bowls"),
              a!tabItem(label: "Noodles"),
              a!tabItem(label: "Desserts")
            },
            contentsPadding: "NONE"
          )
        },
        backgroundColor: "GRAY"
      ),
      a!pane(
        contents: {
          a!headingField(
            text: "Order #12138",
            marginBelow: "NONE",
            size: "MEDIUM",
            fontWeight: "SEMI_BOLD"
          ),
          a!tagField(
            tags: {
              a!forEach(
                items: { "Dine In", "To Go", "Delivery" },
                expression: {
                  a!tagItem(
                    text: fv!item,
                    link: a!dynamicLink(
                      value: fv!index,
                      saveInto: local!selectedTag
                    ),
                    backgroundColor: if(
                      local!selectedTag = fv!index,
                      "ACCENT",
                      "#FFF"
                    )
                  )
                }
              )
            },
            marginBelow: "MORE"
          ),
          a!columnsLayout(
            columns: {
              a!columnLayout(
                contents: {
                  a!richTextDisplayField(
                    labelPosition: "COLLAPSED",
                    value: "Item"
                  )
                }
              ),
              a!columnLayout(
                contents: {
                  a!richTextDisplayField(
                    labelPosition: "COLLAPSED",
                    value: "Quantity",
                    align: "RIGHT"
                  )
                },
                width: "EXTRA_NARROW"
              ),
              a!columnLayout(
                contents: {
                  a!richTextDisplayField(
                    labelPosition: "COLLAPSED",
                    value: "Price",
                    align: "RIGHT"
                  )
                },
                width: "EXTRA_NARROW"
              )
            },
            marginBelow: "NONE"
          ),
          a!horizontalLine(
            marginAbove: "STANDARD",
            marginBelow: "NONE"
          ),
          a!cardLayout(
            contents: {
              a!columnsLayout(
                columns: {
                  a!columnLayout(
                    contents: {
                      a!sideBySideLayout(
                        items: {
                          a!sideBySideItem(
                            item: {
                              a!imageField(
                                labelPosition: "COLLAPSED",
                                images: a!webImage(
                                  source: "https://images.unsplash.com/photo-1730596140741-6cc4963ad816?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1000&h=700&mask=corners&corner-radius=25&crop=center"
                                ),
                                size: "SMALL_PLUS",
                                style: "AVATAR",
                                isThumbnail: false
                              )
                            },
                            width: "MINIMIZE"
                          ),
                          a!sideBySideItem(
                            item: {
                              a!headingField(
                                text: "Edamame", 
                                size: "SMALL"
                              ),
                              a!richTextDisplayField(
                                labelPosition: "COLLAPSED",
                                value: "$6.99"
                              )
                            }
                          )
                        },
                        alignVertical: "MIDDLE"
                      )
                    }
                  ),
                  a!columnLayout(
                    contents: {
                      a!richTextDisplayField(
                        labelPosition: "COLLAPSED",
                        value: a!richTextItem(
                          text: "1", 
                          size: "MEDIUM"
                        ),
                        align: "RIGHT"
                      )
                    },
                    width: "EXTRA_NARROW"
                  ),
                  a!columnLayout(
                    contents: {
                      a!richTextDisplayField(
                        labelPosition: "COLLAPSED",
                        value: {
                          a!richTextItem(
                            text: "$6.99", 
                            size: "MEDIUM"
                          )
                        },
                        align: "RIGHT"
                      )
                    },
                    width: "EXTRA_NARROW"
                  )
                },
                marginAbove: "MORE",
                marginBelow: "MORE",
                alignVertical: "MIDDLE"
              ),
              a!columnsLayout(
                columns: {
                  a!columnLayout(
                    contents: {
                      a!sideBySideLayout(
                        items: {
                          a!sideBySideItem(
                            item: {
                              a!imageField(
                                label: "Image",
                                labelPosition: "COLLAPSED",
                                images: a!webImage(
                                  source: "https://images.unsplash.com/photo-1706468238718-bba7e9b63ad2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1000&h=700&mask=corners&corner-radius=25&crop=center"
                                ),
                                size: "SMALL_PLUS",
                                style: "AVATAR",
                                isThumbnail: false
                              )
                            },
                            width: "MINIMIZE"
                          ),
                          a!sideBySideItem(
                            item: {
                              a!headingField(
                                text: "Agedashi Tofu", 
                                size: "SMALL"
                              ),
                              a!richTextDisplayField(
                                labelPosition: "COLLAPSED",
                                value: "$8.50"
                              )
                            }
                          )
                        },
                        alignVertical: "MIDDLE"
                      )
                    }
                  ),
                  a!columnLayout(
                    contents: {
                      a!richTextDisplayField(
                        labelPosition: "COLLAPSED",
                        value: a!richTextItem(
                          text: "2", 
                          size: "MEDIUM"
                        ),
                        align: "RIGHT"
                      )
                    },
                    width: "EXTRA_NARROW"
                  ),
                  a!columnLayout(
                    contents: {
                      a!richTextDisplayField(
                        labelPosition: "COLLAPSED",
                        value: a!richTextItem(
                          text: "$17.00", 
                          size: "MEDIUM"
                        ),
                        align: "RIGHT"
                      )
                    },
                    width: "EXTRA_NARROW"
                  )
                },
                marginBelow: "MORE",
                alignVertical: "MIDDLE"
              )
            },
            marginBelow: "STANDARD",
            height: "TALL",
            style: "TRANSPARENT",
            showBorder: false,
            padding: "NONE",
            decorativeBarColor: "#000000"
          ),
          a!columnsLayout(
            columns: {
              a!columnLayout(
                contents: {
                  a!richTextDisplayField(
                    labelPosition: "COLLAPSED",
                    value: a!richTextItem(
                      text: "Sub total", 
                      size: "MEDIUM"
                    )
                  ),
                  a!sideBySideLayout(
                    items: {
                      a!sideBySideItem(
                        item: {
                          a!richTextDisplayField(
                            labelPosition: "COLLAPSED",
                            value: a!richTextItem(
                              text: "Discount", 
                              size: "MEDIUM"
                            ),
                            marginBelow: "NONE"
                          )
                        },
                        width: "MINIMIZE"
                      ),
                      a!sideBySideItem(
                        item: {
                          a!tagField(
                            labelPosition: "COLLAPSED",
                            tags: {
                              a!tagItem(
                                text: "5% off", 
                                backgroundColor: "ACCENT"
                              )
                            }
                          )
                        }
                      )
                    },
                    alignVertical: "MIDDLE"
                  ),
                  a!richTextDisplayField(
                    labelPosition: "COLLAPSED",
                    value: a!richTextItem(
                      text: "Tip", 
                      size: "MEDIUM"
                    )
                  ),
                  a!richTextDisplayField(
                    labelPosition: "COLLAPSED",
                    value: a!richTextItem(
                      text: "Tax", 
                      size: "MEDIUM"
                    )
                  )
                }
              ),
              a!columnLayout(
                contents: {
                  a!richTextDisplayField(
                    labelPosition: "COLLAPSED",
                    value: a!richTextItem(
                      text: "$23.99", 
                      size: "MEDIUM"
                    ),
                    align: "RIGHT"
                  ),
                  a!richTextDisplayField(
                    labelPosition: "COLLAPSED",
                    value: a!richTextItem(
                      text: "-$1.19", 
                      size: "MEDIUM"
                    ),
                    align: "RIGHT"
                  ),
                  a!richTextDisplayField(
                    labelPosition: "COLLAPSED",
                    value: a!richTextItem(
                      text: "$5.00", 
                      size: "MEDIUM"
                    ),
                    align: "RIGHT"
                  ),
                  a!richTextDisplayField(
                    labelPosition: "COLLAPSED",
                    value: a!richTextItem(
                      text: "$1.67", 
                      size: "MEDIUM"
                    ),
                    align: "RIGHT"
                  )
                }
              )
            },
            marginAbove: "STANDARD"
          ),
          a!horizontalLine(),
          a!columnsLayout(
            columns: {
              a!columnLayout(
                contents: {
                  a!richTextDisplayField(
                    labelPosition: "COLLAPSED",
                    value: {
                      a!richTextItem(
                        text: "Total", 
                        size: "MEDIUM_PLUS"
                      )
                    }
                  )
                }
              ),
              a!columnLayout(
                contents: {
                  a!richTextDisplayField(
                    labelPosition: "COLLAPSED",
                    value:  a!richTextItem(
                      text: "$29.47",
                      size: "MEDIUM_PLUS",
                      style: "STRONG"
                    ),
                    align: "RIGHT"
                  )
                }
              )
            },
            marginAbove: "STANDARD"
          ),
          a!buttonArrayLayout(
            buttons: {
              a!buttonWidget(
                label: "Continue to payment",
                width: "FILL",
                icon: "credit-card",
                style: "SOLID"
              )
            },
            marginAbove: "MORE",
            marginBelow: "NONE",
            align: "CENTER"
          )
        },
        width: "MEDIUM_PLUS"
      )
    }
  )
)
