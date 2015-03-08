var Dialog = (function() {
    var INPUT_MAX_LENGTH = 40;
    var screen = null;
    var dialog = null;
    var header = null;
    var message = null;
    var input = null;
    var yes = null;
    var no = null;

    return {
        show: function(title, msg, cancel, confirm) {
            if (screen === null) {
                document.body.onkeydown = function(event) {
                    if(event.keyCode == 13) {
                        var input_value = input.value;
                        console.log("zx input enter:" + input_value);
                        confirm.ok(input_value);
                    }
                };
                screen = document.createElement('form');
                screen.setAttribute('role', 'dialog');
                screen.setAttribute('data-type', 'confirm');
                screen.id = 'dialog-screen';

                dialog = document.createElement('section');
                screen.appendChild(dialog);
                header = document.createElement('h1');
                header.id = 'dialog-title';
                header.textContent = title + " " + INPUT_MAX_LENGTH;
                dialog.appendChild(header);

                if (msg) {
                    message = document.createElement('p');
                    message.id = 'dialog-message';
                    message.textContent = msg;
                    dialog.appendChild(message);
                }

                input = document.createElement('input');
                input.id = 'dialog-input';
                input.type = 'text';
                input.maxLength = INPUT_MAX_LENGTH;
                input.placeholder = 'input hexadecimal character (0123456789ABCDEF)...';
                input.oninput = function() {
                    console.log("zx value:" + this.value + ";" + this.value.length);
                    this.value = this.value.replace(/[^0-9a-fA-F]/g,"");
                    header.textContent = title + " " + (INPUT_MAX_LENGTH - this.value.length);
                };
                dialog.appendChild(input);

                var menu = document.createElement('menu');
                menu.dataset['items'] = 1;

                no = document.createElement('button');
                no.type = 'button';

                var noText = document.createTextNode(cancel.title);
                no.appendChild(noText);
                no.id = 'dialog-no';
                no.addEventListener('click', cancel.cancel);
                menu.appendChild(no);

                if (confirm) {
                    menu.dataset['items'] = 2;
                    yes = document.createElement('button');

                    yes.type = 'button';

                    var yesText = document.createTextNode(confirm.title);
                    yes.appendChild(yesText);
                    yes.id = 'dialog-yes';

                    yes.addEventListener('click', function() {
                        var input_value = input.value;
                        confirm.ok(input_value);
                    });
                    menu.appendChild(yes);
                }

                screen.appendChild(menu);

                $('#ble_page')[0].appendChild(screen);
            }
        },

        hidden: function() {
            if (screen === null)
                return;

            $('#ble_page')[0].removeChild(screen);
            screen = null;
            dialog = null;
            header = null;
            message = null;
            input = null;
            yes = null;
            no = null;
        }
    }
}());
