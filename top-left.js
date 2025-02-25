// ==UserScript==
// @name         포켓로그 좌상단고정
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  포켓로그 출력화면 정중앙에서 왼쪽상단으로 변경. 에러는 아직 몰?루
// @author       이름없음
// @match        *://pokerogue.net/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function adjustCanvas() {
        const canvasElement = document.querySelector('div > canvas');
        if (canvasElement) {
            canvasElement.style.position = 'absolute';
            canvasElement.style.top = '0';
            canvasElement.style.left = '0';
            canvasElement.style.margin = '0';
        }
    }

    function removeIframe(mutationsList) {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === Node.ELEMENT_NODE && node.tagName.toLowerCase() === 'iframe') {
                        console.log('Unwanted iframe removed:', node);
                        node.remove();
                    }
                });
            }
        }
    }

    const observer = new MutationObserver(removeIframe);
    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener('load', () => {
        adjustCanvas();
        setInterval(adjustCanvas, 60000);
    });
})();
