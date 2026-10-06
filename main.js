/* ==========================================================================
   CRGA — scripts communs
   - En-tête / pied de page partagés (injectés selon <body data-page="...">)
   - Menu mobile, accordéon, onglets, modales, formulaires simulés
   - Console territoriale, sélection de profil, jauge de mot de passe
   ========================================================================== */
(function () {
  'use strict';

  /* ---------- Configuration du site ---------- */
  var SITE = {
    phone: '03 22 00 15 15',
    phoneHref: 'tel:+33322001515',
    email: 'contact@crga-amiens.fr'
  };

  var NAV = [
    { id: 'accueil', label: 'Accueil & Manifeste', href: 'index.html' },
    { id: 'histoire', label: 'Histoire & Territoire', href: 'histoire.html' },
    { id: 'missions', label: 'Missions & Parcours', href: 'missions.html' },
    { id: 'fiche15', label: 'Fiche 15 · SOS Repreneur', href: 'fiche-15.html', live: true },
    { id: 'agenda', label: 'Agenda & Adhésion', href: 'agenda.html' }
  ];

  var page = document.body.getAttribute('data-page') || '';
  var layout = document.body.getAttribute('data-layout') || 'site';

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ---------- En-tête ---------- */
  function renderHeader() {
    var links = NAV.map(function (item) {
      var active = item.id === page;
      var live = item.live && !active
        ? '<span class="dot dot--vivid ping"></span>'
        : '';
      return '<a href="' + item.href + '"' + (active ? ' class="is-active" aria-current="page"' : '') + '>' +
        live + esc(item.label) + '</a>';
    }).join('');

    var mobileLinks = NAV.map(function (item) {
      var active = item.id === page;
      return '<a href="' + item.href + '"' + (active ? ' class="is-active" aria-current="page"' : '') + '>' +
        esc(item.label) + '<span class="ms ms--18">chevron_right</span></a>';
    }).join('');

    var memberActive = page === 'espace-membre';

    var html =
      '<header class="site-header">' +
        '<div class="container site-header__inner">' +
          '<a class="brand" href="index.html" aria-label="CRGA, retour à l\'accueil">' +
            '<span class="brand__mark"><span class="ms ms--24">hub</span></span>' +
            '<span class="brand__text"><span class="brand__name">CRGA</span><span class="brand__sub">Grand Amiénois</span></span>' +
          '</a>' +
          '<nav class="main-nav" aria-label="Navigation principale">' + links + '</nav>' +
          '<div class="header-actions">' +
            '<a class="btn btn--amber btn--sm" href="fiche-15.html#formulaire-sos"><span class="dot dot--error pulse"></span>SOS Repreneur</a>' +
            (memberActive
              ? '<a class="btn btn--cyan btn--sm" href="espace-membre.html">Espace Membre</a>'
              : '<a class="btn btn--cyan" href="adhesion.html">Adhérer au Collectif</a>') +
            '<a class="avatar-btn" href="' + (memberActive ? 'espace-membre.html' : 'connexion.html') + '" aria-label="Espace membre" title="Espace membre">' +
              '<span class="ms ms--18">shield_person</span></a>' +
            '<button class="burger" type="button" aria-label="Ouvrir le menu" aria-expanded="false" aria-controls="mobile-nav" data-burger>' +
              '<span class="ms ms--24">menu</span></button>' +
          '</div>' +
        '</div>' +
      '</header>' +
      '<nav class="mobile-nav" id="mobile-nav" aria-label="Navigation mobile">' + mobileLinks +
        '<a href="connexion.html">Espace membre<span class="ms ms--18">shield_person</span></a>' +
        '<a class="btn btn--cyan btn--block" href="adhesion.html">Adhérer au Collectif</a>' +
      '</nav>';

    document.body.insertAdjacentHTML('afterbegin', html);

    var burger = document.querySelector('[data-burger]');
    var mobile = document.getElementById('mobile-nav');
    burger.addEventListener('click', function () {
      var open = mobile.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', open);
      burger.querySelector('.ms').textContent = open ? 'close' : 'menu';
    });
    mobile.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        mobile.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
        burger.querySelector('.ms').textContent = 'menu';
      }
    });
  }

  /* ---------- Pied de page ---------- */
  function renderFooter() {
    var year = new Date().getFullYear();
    var html =
      '<footer class="site-footer">' +
        '<div class="container">' +
          '<div class="site-footer__grid">' +
            '<div class="site-footer__about stack-md">' +
              '<div class="row row--md"><span class="brand__mark"><span class="ms ms--24">hub</span></span>' +
                '<span class="t-h2 c-white">CRGA</span></div>' +
              '<p class="c-on-navy-2 mw-sm">Le Collectif des Repreneurs du Grand Amiénois soutient, fédère et sécurise les repreneurs et cédants pour préserver les emplois et la vitalité économique du territoire.</p>' +
              '<div class="row row--wrap">' +
                '<span class="pill pill--navy">Pôle Grand Amiénois</span>' +
                '<span class="pill pill--navy c-amber">Permanence SOS</span>' +
              '</div>' +
            '</div>' +
            '<div><h4>Plateforme</h4><ul class="site-footer__links">' +
              '<li><a href="index.html">Manifeste &amp; Engagements</a></li>' +
              '<li><a href="histoire.html">Histoire &amp; Territoire</a></li>' +
              '<li><a href="missions.html">Missions &amp; Accompagnement</a></li>' +
              '<li><a href="fiche-15.html">Dispositif SOS Fiche 15</a></li>' +
            '</ul></div>' +
            '<div><h4>Réseau &amp; Événements</h4><ul class="site-footer__links">' +
              '<li><a href="agenda.html#agenda">Agenda des rencontres</a></li>' +
              '<li><a href="adhesion.html">Adhérer au Collectif</a></li>' +
              '<li><a href="agenda.html#partenariats">Partenaires &amp; mécénat</a></li>' +
              '<li><a href="connexion.html">Espace membre</a></li>' +
            '</ul></div>' +
            '<div><h4>Urgence Territoriale</h4>' +
              '<div class="card card--navy-surface card--pad-md stack-xs">' +
                '<span class="eyebrow c-amber">Cellule Fiche 15</span>' +
                '<p class="t-h3 bold c-white">Grand Amiénois</p>' +
                '<p class="t-sm c-on-navy-2">Intervention rapide et confidentielle pour les transmissions et reprises sensibles.</p>' +
                '<a class="t-h3 bold c-cyan mt-xs" href="' + SITE.phoneHref + '">' + SITE.phone + '</a>' +
                '<a class="link link--cyan mt-xs" href="fiche-15.html#formulaire-sos">Déclencher l\'alerte <span class="ms ms--16">arrow_forward</span></a>' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<div class="site-footer__bottom">' +
            '<p>© ' + year + ' Collectif des Repreneurs du Grand Amiénois (CRGA). Tous droits réservés.</p>' +
            '<nav aria-label="Liens légaux">' +
              '<a href="#">Mentions légales</a><a href="#">Confidentialité &amp; RGPD</a><a href="missions.html#charte">Charte déontologique</a><a href="credits.html">Crédits photos</a>' +
            '</nav>' +
          '</div>' +
        '</div>' +
      '</footer>';
    document.body.insertAdjacentHTML('beforeend', html);
  }

  if (layout === 'site') {
    renderHeader();
    renderFooter();
  }

  /* ---------- Toast ---------- */
  var toastEl;
  var toastTimer;
  function toast(message, icon) {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.className = 'toast';
      toastEl.setAttribute('role', 'status');
      toastEl.setAttribute('aria-live', 'polite');
      document.body.appendChild(toastEl);
    }
    toastEl.innerHTML = '<span class="ms">' + (icon || 'check_circle') + '</span><span>' + esc(message) + '</span>';
    toastEl.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('is-visible'); }, 4500);
  }
  window.CRGA = { toast: toast };

  /* ---------- Images : repli si une image distante ne charge pas ---------- */
  function hideBroken(img) { img.style.visibility = 'hidden'; }
  document.querySelectorAll('img').forEach(function (img) {
    if (img.complete && img.naturalWidth === 0) hideBroken(img);
    img.addEventListener('error', function () { hideBroken(img); });
  });

  /* ---------- Accordéon ---------- */
  document.querySelectorAll('[data-accordion]').forEach(function (acc) {
    acc.addEventListener('click', function (e) {
      var btn = e.target.closest('.acc-item__btn');
      if (!btn) return;
      var item = btn.closest('.acc-item');
      var open = item.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', open);
    });
  });

  /* ---------- Modales ---------- */
  function openModal(id) {
    var m = document.getElementById(id);
    if (!m) return;
    m.classList.add('is-open');
    var first = m.querySelector('input, select, textarea, button');
    if (first) first.focus();
  }
  function closeModal(m) { m.classList.remove('is-open'); }
  document.addEventListener('click', function (e) {
    var opener = e.target.closest('[data-open-modal]');
    if (opener) { e.preventDefault(); openModal(opener.getAttribute('data-open-modal')); return; }
    var closer = e.target.closest('[data-close-modal]');
    if (closer) { closeModal(closer.closest('.modal')); return; }
    if (e.target.classList && e.target.classList.contains('modal')) closeModal(e.target);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') document.querySelectorAll('.modal.is-open').forEach(closeModal);
  });

  /* ---------- Formulaires (simulation, pas encore de back-end) ----------
     <form data-form data-success="idDuMessage" data-toast="Texte"> */
  document.querySelectorAll('form[data-form]').forEach(function (form) {
    form.setAttribute('novalidate', '');
    form.addEventListener('input', function (e) {
      if (e.target.classList) e.target.classList.remove('is-invalid');
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var invalid = Array.prototype.filter.call(form.elements, function (el) {
        return el.willValidate && !el.checkValidity();
      });
      invalid.forEach(function (el) { el.classList.add('is-invalid'); });
      if (invalid.length) {
        invalid[0].focus();
        toast('Merci de compléter les champs obligatoires.', 'error');
        return;
      }

      var successId = form.getAttribute('data-success');
      var success = successId && document.getElementById(successId);
      if (success) {
        success.classList.add('is-visible');
        success.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      var msg = form.getAttribute('data-toast');
      if (msg) toast(msg);
      if (form.hasAttribute('data-reset')) form.reset();

      var modal = form.closest('.modal');
      if (modal) closeModal(modal);

      var redirect = form.getAttribute('data-redirect');
      if (redirect) setTimeout(function () { window.location.href = redirect; }, 900);
    });
  });

  /* ---------- Préremplissage (agenda / partenariats -> formulaire) ---------- */
  document.querySelectorAll('[data-prefill]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var target = document.getElementById(btn.getAttribute('data-target') || 'adhesion-section');
      var notes = document.getElementById(btn.getAttribute('data-field') || 'project_notes');
      var tier = btn.getAttribute('data-tier');
      if (notes) notes.value = btn.getAttribute('data-prefill');
      if (tier) {
        var tierInput = document.getElementById('selected_tier');
        if (tierInput) tierInput.value = 'Partenaire ' + tier;
      }
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  /* ---------- Bouton de téléchargement simulé ---------- */
  document.querySelectorAll('[data-download]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var confirm = document.getElementById(btn.getAttribute('data-download'));
      if (!confirm) return;
      confirm.classList.remove('hidden');
      setTimeout(function () { confirm.classList.add('hidden'); }, 4000);
    });
  });

  /* ---------- Onglets segmentés (connexion) ---------- */
  document.querySelectorAll('[data-tabs]').forEach(function (group) {
    var buttons = group.querySelectorAll('button[data-tab]');
    buttons.forEach(function (b) {
      b.addEventListener('click', function () {
        buttons.forEach(function (x) {
          x.classList.toggle('is-active', x === b);
          x.setAttribute('aria-selected', x === b);
        });
        group.dispatchEvent(new CustomEvent('tabchange', { detail: b.getAttribute('data-tab') }));
      });
    });
  });

  /* ---------- Afficher / masquer le mot de passe ---------- */
  document.querySelectorAll('[data-toggle-password]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var input = document.getElementById(btn.getAttribute('data-toggle-password'));
      var show = input.type === 'password';
      input.type = show ? 'text' : 'password';
      btn.querySelector('.ms').textContent = show ? 'visibility_off' : 'visibility';
      btn.setAttribute('aria-label', show ? 'Masquer le mot de passe' : 'Afficher le mot de passe');
    });
  });

  /* ---------- Jauge de robustesse du mot de passe ---------- */
  var pwd = document.querySelector('[data-strength]');
  if (pwd) {
    var bars = document.querySelectorAll('#strength-bars span');
    var label = document.getElementById('strength-text');
    var LEVELS = [
      { text: 'À saisir', color: 'var(--outline)' },
      { text: 'Faible', color: 'var(--error)' },
      { text: 'Moyen', color: 'var(--amber)' },
      { text: 'Bon', color: 'var(--secondary)' },
      { text: 'Excellent', color: 'var(--cyan)' }
    ];
    pwd.addEventListener('input', function () {
      var v = pwd.value;
      var score = 0;
      if (v.length >= 6) score++;
      if (v.length >= 8 && /[A-Z]/.test(v)) score++;
      if (/\d/.test(v)) score++;
      if (/[^A-Za-z0-9]/.test(v)) score++;
      var level = v.length === 0 ? 0 : Math.max(1, score);
      var color = LEVELS[level].color;
      bars.forEach(function (bar, i) {
        bar.style.background = i < level ? color : '';
      });
      label.textContent = LEVELS[level].text;
      label.style.color = color;
    });
  }

  /* ---------- Sélection de profil (inscription) ---------- */
  var profileCards = document.querySelectorAll('[data-profile]');
  profileCards.forEach(function (card) {
    function select() {
      profileCards.forEach(function (c) {
        var on = c === card;
        c.classList.toggle('is-selected', on);
        c.setAttribute('aria-checked', on);
      });
      var input = document.getElementById('profile-input');
      if (input) input.value = card.getAttribute('data-profile');
    }
    card.addEventListener('click', select);
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(); }
    });
  });

  /* ---------- Console territoriale (Histoire & Territoire) ---------- */
  var BASINS = {
    amiens: {
      code: 'Pôle 80-A · Amiens intra-muros', title: 'Bassin Amiens Métropole', status: 'Tension : Modérée à Élevée',
      transmissions: '420+', transmissionsSub: 'dont 68 % de dirigeants > 58 ans',
      jobs: '3 850', jobsSub: 'Taux de maintien cible : 92 %',
      duration: '18 mois', durationSub: 'Risque de rupture à M+12', percent: 72,
      img: 'tour-perret.jpg', imgAlt: "La gare d'Amiens et la tour Perret", credit: '© Claude villetaneuse, CC BY-SA 4.0',
      narrative: 'Le bassin amiénois cumule une forte densité tertiaire avec des protocoles stricts de cession de fonds de commerce (baux commerciaux, licences ERP, commissions de sécurité). Les repreneurs y font face à un éclatement des interlocuteurs.'
    },
    coquelicot: {
      code: "Pôle 80-B · Albert & Vallée d'Ancre", title: 'Pays du Coquelicot', status: 'Tension : Critique (savoir-faire)',
      transmissions: '115', transmissionsSub: 'PME industrielles et mécanique de pointe',
      jobs: '1 420', jobsSub: 'Haute qualification requise',
      duration: '24 mois', durationSub: "Recherche d'acquéreurs techniques", percent: 84,
      img: 'albert.jpg', imgAlt: 'Albert et la basilique Notre-Dame de Brebières vus du ciel', credit: '© UnknownEight, CC BY-SA 4.0',
      narrative: "Le défi majeur réside dans la transmission d'ateliers de sous-traitance aéronautique et mécanique. Sans accompagnement sur l'évaluation des machines-outils et les garanties d'actif/passif, les fermetures préventives menacent la chaîne industrielle."
    },
    picardie: {
      code: 'Pôle 80-C · Doullens & Nord Somme', title: 'Picardie Industrielle & Rurale', status: 'Tension : Vulnérabilité haute',
      transmissions: '160', transmissionsSub: 'Multi-secteur : métallurgie et services',
      jobs: '1 980', jobsSub: "Maintien impératif des bassins d'emploi",
      duration: '21 mois', durationSub: 'Éloignement des investisseurs', percent: 79,
      img: 'doullens.jpg', imgAlt: 'Doullens et son beffroi', credit: '© isamiga76, CC BY 2.0',
      narrative: "Sur Doullens et le Val de Nièvre, les cessions exigent un désenclavement financier. Le CRGA facilite les mises en relation directes avec des repreneurs régionaux et négocie les reports d'échéances fiscales auprès des services territoriaux."
    },
    rurales: {
      code: 'Pôle 80-D · Bourgs & communes rurales', title: 'Commerces de Proximité & Artisans', status: 'Tension : Urgence vitale',
      transmissions: '290', transmissionsSub: 'Derniers commerces des communes de < 2 000 hab.',
      jobs: '860', jobsSub: 'Maintien du lien social villageois',
      duration: '14 mois', durationSub: "Difficulté majeure d'obtention de crédit", percent: 91,
      img: 'village-thoix.jpg', imgAlt: 'Rue du village de Thoix et son église', credit: '© Claude villetaneuse, CC BY-SA 4.0',
      narrative: "Boulangeries, boucheries, stations et garages ruraux. La disparition d'un établissement condamne la vitalité d'un village entier. Le CRGA active ici des schémas de reprise coopérative ou mixte avec le soutien des élus municipaux."
    },
    plateau: {
      code: 'Pôle 80-E · Montdidier & Santerre', title: 'Plateau Picard Agro-Industriel', status: 'Tension : Structurée',
      transmissions: '140', transmissionsSub: 'Agro-alimentaire et logistique de flux',
      jobs: '2 150', jobsSub: 'Impact fort sur les transporteurs locaux',
      duration: '16 mois', durationSub: 'Audits de conformité environnementale ICPE', percent: 65,
      img: 'montdidier.jpg', imgAlt: 'Centre-ville de Montdidier', credit: '© Milliped, CC BY-SA 4.0',
      narrative: "Bassin caractérisé par de grands volumes de stockage et des contraintes environnementales renforcées (ICPE). Le collège d'experts du CRGA sécurise les audits préalables pour éviter que le repreneur n'hérite de passifs écologiques imprévus."
    }
  };

  var basinButtons = document.querySelectorAll('[data-basin]');
  basinButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var d = BASINS[btn.getAttribute('data-basin')];
      if (!d) return;
      basinButtons.forEach(function (b) {
        b.classList.toggle('is-active', b === btn);
        b.setAttribute('aria-pressed', b === btn);
      });
      var set = function (id, val) { var el = document.getElementById(id); if (el) el.textContent = val; };
      set('basin-code', d.code);
      set('basin-title', d.title);
      set('basin-status', d.status);
      set('stat-transmissions', d.transmissions);
      set('stat-transmissions-sub', d.transmissionsSub);
      set('stat-jobs', d.jobs);
      set('stat-jobs-sub', d.jobsSub);
      set('stat-duration', d.duration);
      set('stat-duration-sub', d.durationSub);
      set('gauge-percent', d.percent + ' %');
      set('basin-narrative', d.narrative);
      var bar = document.getElementById('gauge-bar');
      if (bar) bar.style.width = d.percent + '%';

      var img = document.getElementById('basin-img');
      if (img && d.img) {
        img.classList.add('is-swapping');
        setTimeout(function () {
          img.onload = function () { img.classList.remove('is-swapping'); };
          img.src = d.img;
          img.alt = d.imgAlt;
          set('basin-credit', d.credit);
        }, 200);
      }
    });
  });

  /* ---------- Chips de filtre (espace membre) ---------- */
  document.querySelectorAll('[data-chips]').forEach(function (group) {
    group.addEventListener('click', function (e) {
      var chip = e.target.closest('.chip');
      if (!chip) return;
      chip.classList.toggle('is-active');
    });
  });

  /* ---------- Apparition au défilement ---------- */
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); }
      });
    }, { threshold: .12 });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('is-visible'); });
  }
})();
