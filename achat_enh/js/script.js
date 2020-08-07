window.onload = () => {
    console.log('page is fully loaded');
    // Functions for easy selecting and styling...
    let es = function(s, t, arr) {
        document.querySelector(s)[t] = function() {
            arr.forEach(e => {
                document.querySelector(e[0]).style[e[1]] = e[2];
            });
        }
    }

    // Manages back button and hash navigation...
    window.addEventListener("hashchange", function() {
        console.log("Hash changed to", window.location.hash);
        // .... Do your thing here...
        let hash = window.location.hash;
        if (hash) {
            history.pushState(null, null, hash);
            hash = hash.split('-');
            if (hash[0] === "#messages" || hash[0] === "#messages/") activatemenu('#chatlist');
            if (hash[0] === "#calls" || hash[0] === "#calls/") activatemenu('#callList');
            else if (hash[0] === "#chat") {
                if (hash[1]) openchat(hash[1]);
                else window.location.hash = 'messages';
            } else if (hash[0] === '#call') {
                if (hash[1]) opencall(hash[1]);
                else window.location.hash = 'messages';
            } else window.location.hash = 'messages';
        } else {
            window.location.hash = 'messages';
            return;
        }
    });
    if (!window.location.hash) window.location.hash = '#messages';

    let activatemenu = function(menu) {
        let m = document.getElementById('chatList');
        let c = document.getElementById('callList');
        switch (menu) {
            case '#chatlist':
                if (m.style.left !== '0') {
                    m.style.left = '0';
                    document.querySelector('header div.secondnav div.chats').classList.add('active')
                }
                c.style.left = '100vw';
                document.querySelector('header div.secondnav div.calls').classList.remove('active');
                break;
            case '#callList':
                if (c.style.left !== '0') {
                    c.style.left = '0';
                    document.querySelector('header div.secondnav div.calls').classList.add('active');
                }
                m.style.left = '-100vw';
                document.querySelector('header div.secondnav div.chats').classList.remove('active');
                break;

            default:
                activatemenu('#chatlist')
                break;
        }

    }

    // topnav menu in and out
    es('header div.topnav span.menu', 'onmouseenter', [
        ['header div.sidenav', 'right', 0]
    ]);
    es('header div.topnav span.menu', 'onmouseleave', [
        ['header div.sidenav', 'right', '-44px']
    ]);
    // topnav search in and out
    es('header div.topnav span.search', 'onmouseenter', [
        ['header div.searchnav', 'width', '100vw'],
        ['header div.searchnav', 'right', '0']
    ]);
    es('header div.secondnav', 'onmouseenter', [
        ['header div.searchnav', 'width', '0'],
        ['header div.searchnav', 'right', '44px']
    ]);
    es('#chatList', 'onmouseenter', [
        ['header div.searchnav', 'width', '0'],
        ['header div.searchnav', 'right', '44px']
    ]);
    document.querySelector('header div.secondnav div.chats').onmouseover = function() { window.location.hash = 'messages'; }
    document.querySelector('header div.secondnav div.calls').onmouseover = function() { window.location.hash = 'calls'; }




};