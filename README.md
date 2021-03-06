# Backgrid for backbone-forms editor

使用 Backbone-forms 时，会有嵌入一个可编辑表格的需求，如个人资料中的联系方式。BackgridEditor提供了一个可编辑表格的实现方式。

当然，Backbone-forms已经提供了editor.List，可以用于管理数据中的数组元素。并提供增、删、改功能。

正如Backbone-forms与Backgrid组件的区别，editor.List与editor.Backgrid二者服务于不同的业务目标。editor.Backgrid重点是在表格上进行数据的编辑。

## screenshot

![Screenshot](http://www.marlindoo.com/assets/images/editor-backgrid-screenshot.png)

## Installation

Dependencies:

* [backbone 1+](http://documentcloud.github.io/backbone/)
* backbone-forms 0.14
* backgrid 0.3.5

First make sure you have Bower installed.

* bower install

## Usage

    var User = Backbone.Model.extend({
        schema: {
          name:     { type: 'Text', title:'Name' },
          gender:   { type: 'Select', title:'Gender', options: ['Mr', 'Mrs', 'Ms'] },
          contacts: { type: 'Backgrid', title:'Contacts', editorClass:'backgrid-field', columns:[
            {
              name: "account",
              label: "Account",
              cell: Backgrid.SelectCell.extend({
                optionValues: [["WeChat", "wechat"], ["WhatsApp", "whatsapp"], ["Weibo", "weibo"], ["Tecent QQ", "qq"]]
              })
            }, {
              name: "name",
              label: "Name",
              cell: "string"
            }
          ]}
        }
      });

      var user = new User({
        name:'MarlinDoo',
        contacts:[
          {name:'marlin_dong@hotmail.com', account:'wechat'},
          {name:'marlin_dong@hotmail.com', account:'whatsapp'},
          {name:'donghui@dogesoft.com', account:'weibo'},
        ]
      });
      var form = new Backbone.Form({
        model: user
      }).render();
      $('#main').append(form.el);
    

## Roadmap


