/*$(document).ready(function() {
    $('#mobile_btn').on('click', function(){
        $('#mobile_menu').toggleClass('active');
    });
});*/

//animação ao clicar e layout da lista

const mobileBtn = document.getElementById('mobile_btn');
const mobileMenu = document.getElementById('mobile_menu');
const mobileIcon = mobileBtn.querySelector('i');
const mobileLinks = document.querySelectorAll('#mobile_menu a');

mobileBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('active');

  // troca ícone
  if (mobileMenu.classList.contains('active')) {
    mobileIcon.classList.remove('fa-bars');
    mobileIcon.classList.add('fa-xmark');
  } else {
    mobileIcon.classList.remove('fa-xmark');
    mobileIcon.classList.add('fa-bars');
  }
});

// fecha ao clicar em um link
mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    mobileIcon.classList.remove('fa-xmark');
    mobileIcon.classList.add('fa-bars');
  });
});

//Botao pra voltar pro topo
const scrollTopBtn = document.getElementById('scroll_top');

// aparece ao rolar a página
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollTopBtn.classList.add('show');
  } else {
    scrollTopBtn.classList.remove('show');
  }
});

// sobe tudo ao clicar
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

//botao para mudar a cor do sistema / modo noturno e diurno
const themeButtons = document.querySelectorAll('.theme_toggle');

if (themeButtons.length) {
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const theme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
  updateIcons(theme);

  themeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateIcons(newTheme);
    });
  });

  function updateIcons(theme) {
    themeButtons.forEach(btn => {
      const icon = btn.querySelector('i');
      icon.className =
        theme === 'dark'
          ? 'fa-solid fa-sun'
          : 'fa-solid fa-moon';
    });
  }
}

// Galeria de pessoas com descrição detalhada
const people = document.querySelectorAll('.photo-item');
const note = document.getElementById('profile_note');
const closeBtn = document.getElementById('close_note');

const noteName = document.getElementById('note_name');
const noteRole = document.getElementById('note_role');
const noteInfo = document.getElementById('note_info');

let isPinned = false; // controla se foi aberto por clique

function showNote(person, pin = false) {
  noteName.textContent = person.dataset.nome;
  noteRole.textContent = person.dataset.cargo;
  noteInfo.textContent = person.dataset.info;

  note.classList.add('show');
  isPinned = pin;
}

function hideNote() {
  note.classList.remove('show');
  isPinned = false;
}

people.forEach(person => {
  // hover → abre temporário
  person.addEventListener('mouseenter', () => {
    if (!isPinned) showNote(person);
  });

  // saiu do hover → fecha se não estiver "fixado"
  person.addEventListener('mouseleave', () => {
    if (!isPinned) hideNote();
  });

  // click → fixa a nota
  person.addEventListener('click', (e) => {
    e.stopPropagation(); // evita fechar imediatamente
    showNote(person, true);
  });
});

// botão fechar
closeBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  hideNote();
});

// clique fora fecha a nota
document.addEventListener('click', () => {
  hideNote();
});

//Animação dos artigos
const objCards = document.querySelectorAll('#obj article');

const objObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      } else {
        entry.target.classList.remove('show');
      }
    });
  },
  {
    threshold: 0.2
  }
);

objCards.forEach((card, index) => {
  card.style.transitionDelay = `${index * 0.15}s`;
  objObserver.observe(card);
});
