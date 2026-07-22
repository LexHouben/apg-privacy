// Zwevende pijlen op de achtergrond + scroll-reveal. Puur decoratief: als
// JavaScript uitstaat of de bezoeker minder beweging wil, blijft de pagina
// volledig leesbaar.
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Achtergrondpijlen
  if (!reduce) {
    var layer = document.querySelector('.arrows');
    if (layer) {
      var glyphs = ['↑', '→', '↓', '←'];
      for (var i = 0; i < 14; i++) {
        var s = document.createElement('span');
        s.textContent = glyphs[i % glyphs.length];
        s.style.left = Math.random() * 100 + 'vw';
        s.style.fontSize = (22 + Math.random() * 34) + 'px';
        s.style.animationDuration = (14 + Math.random() * 16) + 's';
        s.style.animationDelay = (-Math.random() * 20) + 's';
        layer.appendChild(s);
      }
    }
  }

  // Secties laten inschuiven zodra ze in beeld komen
  var items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || reduce) {
    for (var j = 0; j < items.length; j++) items[j].classList.add('in');
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { rootMargin: '0px 0px -40px 0px' });
  items.forEach(function (el) { io.observe(el); });
})();
