import images from '../../images/team/*.jpg';
import imagesPNG from '../../images/team/*.png';

const teamModalMarkup = `
<div class="footer-modal__window">     
        <div class="team">
        <img src="${images['Team']}" alt="team" class="team__list team__img ">
            <div class="team-box">
                <span class="team-logo__name">Our team </span>
            </div>
        </div>

        <div class="team">
            <a href="https://github.com/nataliakif " class="social-list__link foto-link" target="_blank "></a>
            <img src="${images['Kyforenko']}" alt="nataliakyforenko" class="team__list team__img ">
            <div class="team-box">
                <span class="team__name ">Natalia Kyforenko </span>
                <span class="team__work ">Team Lead</span>
            </div>
        </div>


        <div class="team ">
            <a href="https://github.com/szhosan" class="social-list__link " target="_blank "></a>
            <img src="${images['Zhosan']}" alt="zhosanserhii" class="team__img ">
            <div class="team-box">
                <span class="team__name ">Zhosan Serhii</span>
                <span class="team__work ">Scrum Master</span>
            </div>
        </div>

        <div class="team ">
            <a href="https://github.com/SergiyRybin" class="social-list__link " target="_blank "></a>
            <img src="${images['Rybin']}" alt="Sergiy Rybin " class="team__img ">
            <div class="team-box">
                <span class="team__name ">Sergiy Rybin</span>
                <span class="team__work ">Developer</span>
            </div>
        </div>

        <div class="team ">
            <a href="https://github.com/shakal194" class="social-list__link " target="_blank "></a>
            <img src="${images['Soloviev']}" alt="oleksandrsoloviov " class="team__img ">
            <div class="team-box">
                <span class="team__name ">Oleksandr Soloviov</span>
                <span class="team__work ">Developer</span>
            </div>
        </div>

        <div class="team ">
            <a href="https://github.com/Denys-Saveliev" class="social-list__link " target="_blank "></a>
            <img src="${imagesPNG['Saveliev']}" alt="denyssaveliev " class="team__img ">
            <div class="team-box">
                <span class="team__name ">Denys Saveliev</span>
                <span class="team__work ">Developer</span>
            </div>
        </div>

        <div class="team ">
            <a href="https://github.com/OliaChuzhdiuk" class="social-list__link " target="_blank "></a>
            <img src="${imagesPNG['Chuzhdiuk']}" alt="olhachuzhdiuk " class="team__img ">
            <div class="team-box">
                <span class="team__name ">Olha Chuzhdiuk</span>
                <span class="team__work ">Developer</span>
            </div>
        </div>

        <div class="team ">
            <a href="https://github.com/MishynMykhailo " class="social-list__link " target="_blank "></a>
            <img src="${images['Mishyn']}" alt="mishynmykhailo " class="team__img ">
            <div class="team-box">
                <span class="team__name ">Mishyn Mykhailo</span>
                <span class="team__work ">Developer</span>
            </div>
        </div>

        <div class="team ">
            <a href="https://github.com/salampego" class="social-list__link " target="_blank "></a>
            <img src="${imagesPNG['Ivanyan']}" alt="haikivanyan " class="team__img ">
            <div class="team-box">
                <span class="team__name ">Haik Ivanyan</span>
                <span class="team__work ">Developer</span>
            </div>
        </div>

        <div class="team ">
            <a href="https://github.com/SergeyFilchenko" class="social-list__link " target="_blank "></a>
            <img src="${images['Filchenko']}" alt="serhiifilchenko " class="team__img ">
            <div class="team-box">
                <span class="team__name ">Serhii Filchenko</span>
                <span class="team__work ">Developer</span>
            </div>
        </div>

        <div class="team ">
            <a href="https://github.com/DmytroGashutin" class="social-list__link " target="_blank "></a>
            <img src="${imagesPNG['Gashutin']}" alt="dmytrogashutin " class="team__img ">
            <div class="team-box">
                <span class="team__name ">Dmytro Gashutin</span>
                <span class="team__work ">Developer</span>
            </div>
        </div>
</div>`;


export { teamModalMarkup };