const $ = document.querySelector.bind(document),
$$ = document.querySelectorAll.bind(document),
body = $('body');

function chooseOptionClick(){
	if(event.target.closest('.custom-input')) customInputActive();
	if(event.target.closest('.header__burger')) openBurger();
	if(event.target.closest('.menu__close')||
		event.target.matches('.menu')) closeBurger();
	if(event.target.closest('.tab-btn')) tabsActive(event.target, event.target.closest('.tabs'));
	if(event.target.classList.contains('modal-close')||
		event.target.classList.contains('modal')) closeModal();
	if(event.target.closest('.modal-open')) openModal(event.target.closest('.modal-open'));
	if(event.target.matches('.scroll')) scrollInto(event.target);
}
window.addEventListener("load", function(){
	customInputActive();
	body.addEventListener("click", chooseOptionClick);
	online();
	$('.cover').classList.add('hidden');
});
function customInputActive(){
	$$('.custom-input input').forEach(item=>{
		item.parentElement.classList.remove('active');
		if(item.checked) item.parentElement.classList.add('active');
	});
}

function openBurger(){
	body.classList.add('lock');
	$('.menu').classList.add('active');
}
function closeBurger(){
	body.classList.remove('lock');
	$('.menu').classList.remove('active');
}

function tabsActive(el1, el2){
	el2.querySelectorAll('.tab-btn').forEach(i=>i.classList.remove('active'));
	el1.classList.add('active');
	$$(`.${el1.dataset.close}`).forEach(i=>i.classList.add('hidden'));
	$(`#${el1.dataset.tab}`).style.transition = 'opacity 0.5s';
	$(`#${el1.dataset.tab}`).classList.remove('hidden');
	$(`#${el1.dataset.tab}`).style.opacity = '0';
	setTimeout(()=>$(`#${el1.dataset.tab}`).style.opacity = '1', 10);
}

new Swiper('.education__slider', {
	autoHeight: true,
	loop: true,
	speed: 1000,
	navigation: {
		nextEl: '.education__button-next',
		prevEl: '.education__button-prev',
	},
});

new Swiper('.review__block', {
	watchOverflow: true,
	slidesPerView: 'auto',
	spaceBetween: 30,
	loop: true,
	navigation: {
		nextEl: '.review__button-next',
		prevEl: '.review__button-prev',
	},
});

function openModal(el, ev) {
	let element = $(`.${el.dataset.modal}`);
	if(!ev){
		element.style.top = event.clientX + 'px';
	element.style.left = event.clientY + 'px';
	}
	element.classList.remove('hidden');
	setTimeout(() => {
		element.style.top = '';
		element.style.left = '';
		}, 50)
	setTimeout(() => element.classList.remove('show'), 10)
	let paddingCorrect = window.innerWidth - $('body').clientWidth;
	body.classList.add('lock');
	body.style.paddingRight = paddingCorrect + 'px';
}
function closeModal(){
	let element = event.target.closest('.modal');
	setTimeout(() => element.classList.add('hidden'), 305);
	element.classList.add('show');
	body.classList.remove('lock');
	body.style.paddingRight = '';
}

function online(){
	let h = new Date().getHours();
	if(h>=10&&h<=20){
		$$('.online').forEach(i=>i.classList.add('active'));
	} else $$('.online').forEach(i=>i.classList.remove('active'));
}

function scrollInto(el){
	$(`#${el.dataset.scroll}`).scrollIntoView({
		block: 'start',
		behavior: 'smooth',
	});
	$$('[data-scroll]').forEach(i=>i.classList.remove('active'));
	el.classList.add('active');
	closeBurger();
}

window.addEventListener("scroll", function(){
	let el = document.elementFromPoint(100, 100);
	if(el.closest('.pointer')){
		$$('[data-scroll]').forEach(i=>i.classList.remove('active'));
		$(`[data-scroll="${el.closest('.pointer').id}"]`).classList.add('active');
	}
})