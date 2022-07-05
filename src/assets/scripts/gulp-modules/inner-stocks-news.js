new Swiper('.swiper-container');
{
    const video = document.querySelector('.isn__video');
    const playButton = document.querySelector('.isn__video-btn-play');
    video.addEventListener('pause',function(evt){
        playButton.style.display = '';
        video.removeAttribute('controls');

    });
    playButton.addEventListener('click', () => {
        video.play();
        video.setAttribute('controls', '');
        playButton.style.display = 'none';
        
    })
}