function imageGallery(option) {
  let wrapperElement = document.querySelector(option.wrapper);
  if (wrapperElement) {
    renderGallery();
    let imgListElements = wrapperElement.querySelectorAll(option.imageList);
    let imgList = Array.from(imgListElements).reduce(function (
      values,
      currentValue
    ) {
      values.push(currentValue.src);
      return values;
    },
    []);
    let gallery = document.querySelector(".gallery");
    let closeBtn = gallery.querySelector(".gallery__header-close");
    let prevBtn = gallery.querySelector(".gallery__body-control--prev");
    let nextBtn = gallery.querySelector(".gallery__body-control--next");
    let galleryOpenStatus = false;
    let isFirst = false;
    let isLast = false;
    let currentIndex = 0;

    // Render img in Gallery when click img
    imgListElements.forEach(function (imgListElement) {
      imgListElement.parentElement.onclick = (e) => {
        let imgSrc = e.target.src;
        toggleOpenGallery();
        gallery.querySelector(".gallery__body-image > img").src = imgSrc;
        currentIndex = imgList.indexOf(imgSrc);
        handlePosition(currentIndex);
      };
    });

    // close Gallery event
    closeBtn.onclick = () => {
      toggleOpenGallery();
    };

    //Event click prev btn
    prevBtn.onclick = () => {
      currentIndex--;

      gallery.querySelector(".gallery__body-image > img").src =
        imgList[currentIndex];
      handlePosition(currentIndex);
    };

    //Event click next btn
    nextBtn.onclick = () => {
      currentIndex++;

      gallery.querySelector(".gallery__body-image > img").src =
        imgList[currentIndex];
      handlePosition(currentIndex);
    };

    function toggleOpenGallery() {
      galleryOpenStatus = !gallery.classList.contains("gallery--disabled");
      gallery.classList.toggle("gallery--disabled", galleryOpenStatus);
    }

    function handlePosition(currentIndex) {
      switch (currentIndex) {
        case 0:
          isFirst = true;
          isLast = false;
          break;
        case imgList.length - 1:
          isFirst = false;
          isLast = true;
          break;
        default:
          isFirst = false;
          isLast = false;
      }

      toggleNextPrevBtn();
    }

    function toggleNextPrevBtn() {
      gallery
        .querySelector(".gallery__body-control--prev")
        .classList.toggle("gallery__body-control--hidden", isFirst);
      gallery
        .querySelector(".gallery__body-control--next")
        .classList.toggle("gallery__body-control--hidden", isLast);
    }
  }

  function renderGallery() {
    wrapperElement.innerHTML =
      wrapperElement.innerHTML +
      `
    <div class="gallery gallery--disabled">
      <div class="gallery__header">
        <button class="gallery__header-close">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="gallery__body">
        <div
          class="
            gallery__body-control
            gallery__body-control--prev
          "
        >
          <i class="fas fa-chevron-left"></i>
        </div>
        <div class="gallery__body-image">
          <img src="./images/img1.jpeg" alt="Loading" />
        </div>
        <div
          class="
            gallery__body-control
            gallery__body-control--next
          "
        >
          <i class="fas fa-chevron-right"></i>
        </div>
      </div>
    </div>
    `;
  }
}
