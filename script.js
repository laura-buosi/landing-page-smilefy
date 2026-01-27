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

const noteName = document.getElementById('note_name');
const noteRole = document.getElementById('note_role');
const noteInfo = document.getElementById('note_info');

function showNote(person) {
  noteName.textContent = person.dataset.nome;
  noteRole.textContent = person.dataset.cargo;
  noteInfo.textContent = person.dataset.info;

  const rect = person.getBoundingClientRect();
  const scrollY = window.scrollY;
  const scrollX = window.scrollX;

  const noteWidth = note.offsetWidth;
  const padding = 12;

  let top, left;

  if (window.innerWidth >= 1280) {
    // desktop: ao lado
    top = rect.top + scrollY;
    left = rect.right + padding + scrollX;

    /* se sair da tela, joga pra esquerda
    if (left + noteWidth > window.innerWidth) {
      left = rect.left - noteWidth - padding + scrollX;
    }*/

  } else {
    // tablet e mobile: embaixo
    top = rect.bottom + padding + scrollY;
    left = rect.left + scrollX;

    /* garante que não ultrapasse a tela
    if (left + noteWidth > window.innerWidth) {
      left = window.innerWidth - noteWidth - padding;
    }
    if (left < padding) {
      left = padding;
    }*/
  }

  note.style.top = `${top}px`;
  note.style.left = `${left}px`;

  note.classList.add('show');
}

function hideNote() {
  note.classList.remove('show');
}

people.forEach(person => {
  person.addEventListener('mouseenter', () => showNote(person));
  person.addEventListener('click', () => showNote(person));
  person.addEventListener('mouseleave', () => hideNote());
  });

  //  person.addEventListener('mouseleave', () => {
  // if (window.innerWidth > 768) hideNote();
  // });

// clicar fora fecha
document.addEventListener('click', (e) => {
  if (!e.target.closest('.photo-item') && !e.target.closest('#profile_note')) {
    hideNote();
  }
});
