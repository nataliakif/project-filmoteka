import images from '../../images/team/*.jpg';

const teamModalMarkup = `

<div class="footer-modal__window">
    <ul class="team">
        <li class="team__list">
            <a href="https://github.com/nataliakif/project-filmoteka"  target="_blank" class="social-list__item">
                <img src="${images['Team']}" alt="team" class="team__list team__img">
                <div class="team__box">
                    <h3 class="team-logo__name">Our team </h3>
                </div>
            </a>
        </li>
        <li class="team__list">
            <a href="https://github.com/nataliakif" target="_blank" class="social-list__item">
                <img src="${images['Kyforenko']}" alt="nataliakyforenko" class="team__img">
                <div class="team__box">
                    <h3 class="team__name">Natalia Kyforenko </h3>
                    <p class="team__work">Team Lead</p>
                </div>
            </a>
        </li>
        <li class="team__list">
            <a href="https://github.com/szhosan" target="_blank" class="social-list__item">
                <img src="${images['Zhosan']}" alt="zhosanserhii" class="team__img ">
                <div class="team__box">
                    <h3 class="team__name">Zhosan Serhii</h3>
                    <p class="team__work">Scrum Master</p>
                </div>
            </a>
        </li>
        <li class="team__list">
            <a href="https://github.com/SergiyRybin" target="_blank" class="social-list__item">
                <img src="${images['Rybin']}" alt="Sergiy Rybin" class="team__img">
                <div class="team__box">
                    <h3 class="team__name">Sergiy Rybin</h3>
                    <p class="team__work">Developer</p>
                </div>
            </a>
        </li>
        <li class="team__list">
            <a href="https://github.com/shakal194" target="_blank" class="social-list__item">
                <img src="${images['Soloviev']}" alt="oleksandrsoloviov" class="team__img">
                <div class="team__box">
                    <h3 class="team__name">Oleksandr Soloviov</h3>
                    <p class="team__work">Developer</p>
                </div>
            </a>
        </li>
        <li class="team__list">
            <a href="https://github.com/Denys-Saveliev" target="_blank" class="social-list__item">
                <img src="${images['Saveliev']}" alt="denyssaveliev" class="team__img">
                <div class="team__box">
                    <h3 class="team__name">Denys Saveliev</h3>
                    <p class="team__work">Developer</p>
                </div>
            </a>
        </li>
        <li class="team__list">
            <a href="https://github.com/OliaChuzhdiuk" target="_blank" class="social-list__item">
                <img src="${images['Chuzhdiuk']}" alt="olhachuzhdiuk" class="team__img">
                <div class="team__box">
                    <h3 class="team__name">Olha Chuzhdiuk</h3>
                    <p class="team__work">Developer</p>
                </div>
            </a>
        </li>
        <li class="team__list">
            <a href="https://github.com/MishynMykhailo" target="_blank" class="social-list__item">
                <img src="${images['Mishyn']}" alt="mishynmykhailo" class="team__img">
                <div class="team__box">
                    <h3 class="team__name">Mishyn Mykhailo</h3>
                    <p class="team__work">Developer</p>
                </div>
            </a>
        </li>
        <li class="team__list">
            <a href="https://github.com/salampego" target="_blank" class="social-list__item">
                <img src="${images['Ivanyan']}" alt="haikivanyan" class="team__img">
                <div class="team__box">
                    <h3 class="team__name">Haik Ivanyan</h3>
                    <p class="team__work">Developer</p>
                </div>
            </a>
        </li>
        <li class="team__list">
            <a href="https://github.com/SergeyFilchenko" target="_blank" class="social-list__item">
                <img src="${images['Filchenko']}" alt="serhiifilchenko" class="team__img">
                <div class="team__box">
                    <h3 class="team__name">Serhii Filchenko</h3>
                    <p class="team__work">Developer</p>
                </div>
            </a>
        </li>
        <li class="team__list">
            <a href="https://github.com/DmytroGashutin" target="_blank" class="social-list__item">
                <img src="${images['Gashutin']}" alt="dmytrogashutin" class="team__img">
                <div class="team__box">
                    <h3 class="team__name">Dmytro Gashutin</h3>
                    <p class="team__work">Developer</p>
                </div>
            </a>
        </li>
    </ul>
</div>`;

export { teamModalMarkup };
