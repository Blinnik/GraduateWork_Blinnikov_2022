$('.categories li').on('click', setCategory);

function setCategory() {
  blank();

  const selected = $(this);
  selected.addClass('active');  

  const categoryCommands = $(`.commands .${selected[0].id}`);
  categoryCommands.show();
  
  updateResultsText(categoryCommands);
}
function blank() {
  $('.categories li').removeClass('active');
  $('.commands ul').hide();
}

$('#search + button').on('click', () => {
  const query = $('#search input').val();
  if (!query.trim()) {
    updateResultsText(commands);
    return $('.commands ul').show();
  }

  const results = new Fuse(commands, {
      isCaseSensitive: false,
      keys: [
        { name: 'name' }, // weight: 1
        { name: 'aliases' }, // weight: 1
      ]
    })
    .search(query)
    .map(r => r.item);

  blank(); 
  
  for (const command of results)
    $(`#${command.name}Command`).show();

  updateResultsText(results);
});

function updateResultsText(arr) {  
  $('#commandError').text(
    (arr.length <= 0)
    ? 'There is nothing to see here.'
    : '');
}

setCategory.bind($('.categories li')[0])();