//READ MORE
function checkForReadMore() {
    setTimeout(() => {

        let commentItems = document.querySelectorAll(".feedback-main-item");

        commentItems.forEach((e) => {
            let commentText = e.querySelector(".feedback-main-item-text");
            let textHeigh = commentText.clientHeight;)

            if (0 > textHeigh - commentText.scrollHeight) {
                let readMore = e.querySelector(".read-more");
                let close = e.parentElement.querySelector(".close");
                readMore.style.display = "block";

                readMore.addEventListener("focus", function () {
                    this.parentElement.classList.add("open");
                    this.style.opacity = "0";
                    this.parentElement.classList.remove("trunc");

                    masonryLayout();
                });

                readMore.addEventListener("blur", function () {
                    this.parentElement.classList.remove("open");
                    this.style.opacity = "1";
                    this.parentElement.classList.add("trunc");
                    masonryLayout();
                });
            }
        });
    }, 500)
}
