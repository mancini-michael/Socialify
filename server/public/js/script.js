$(document).ready(() => {
  $("footer .container-md span").html(`&copy; ${new Date().getFullYear()}`);
});

$(document).ready(() => {
  $("#post").submit(async (event) => {
    event.preventDefault();

    const author = $("#author").val();
    const description = $("#description").val();
    const photo = $("#photo").val();

    if (!description) {
      $("#alert").append(
        `<div class="alert alert-danger text-center">Aggiungere una descrizione.</div>`
      );
      return;
    }

    const post = { author, description, photo };

    $.ajax({
      url: "http://localhost:8080/api/v1/post",
      type: "POST",
      data: post,
      success: (result) => {
        location.reload();
      },
    });
  });
});
