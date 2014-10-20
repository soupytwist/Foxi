var activeCard;

function toCard(card) {
  console.log("Showing card: " + card.id);
  // If there is no active card, just show the new one
  if (activeCard) {
    var dir = activeCard.num < card.num ? 'left' : 'right';
    $(activeCard.id).removeClass("card-active").addClass(dir);
  }

  $(card.id).removeClass("left right").addClass("card-active");
  activeCard = card;
}

module.exports.show = null;
module.exports.season = null;
module.exports.episode = null;
module.exports.toCard = toCard;
