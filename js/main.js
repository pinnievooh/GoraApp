//localStorage.clear();

function addInterest() {
    var $interests = $("#my_interests");
    var $newInterestInput = $('#user_interests_new');
    var interestText = $newInterestInput.val();

    //убираем тэги из введенного текста
    interestText = interestText.replace(/<\/?[^>]+>/gi, '');

    if (interestText.length < 2 || interestText.length > 20) {
        $('.error').show();
        return;
    }
    else {
        $('.error').hide();
    }

    $interests.append('<input type="button" class="btn_int" value=' + interestText + '>');

    var currentInterestsCount = $("#my_interests > input").length;
    LocalStorage.addToJson(
        "interests",
        currentInterestsCount,
        interestText
    );
    $newInterestInput.val('');

}

function removeInterest($interest) {
    $interest.hide();
    LocalStorage.removeFromJson(
        "interests",
        $interest.val()
    );
}

function loadInterestsFromLocalStorage() {
    var defaultInterests = ['Музыка', 'Компьютеры', 'Радио'];
    var $interests = $("#my_interests");
    var interests;
    if (interests = LocalStorage.getJson("interests")) {
        for (var index in interests) {
            var interest = interests[index];
            $interests.append('<input type="button" class="btn_int" value=' + interest + '>');
        }
    } else {
        for (var i = 0; i < defaultInterests.length; i++) {
            $interests.append('<input type="button" class="btn_int" value=' + defaultInterests[i] + '>');
            /* todo поменять input на button */
            LocalStorage.addToJson(
                "interests",
                i,
                defaultInterests[i]
            );
        }
    }
}

function loadFieldsFromLocalStorage() {
    var fields = [
        'name', 'sp', 'phone', 'mail'
    ];
    for (var key in fields) {
        var value = LocalStorage.get(fields[key]);
        if (value) {
            $("#" + fields[key]).html(value);
        }
    }
}
$(function () {
    loadInterestsFromLocalStorage();
    loadFieldsFromLocalStorage();
});

$(document).on("click", "span", function (e) {
    e.stopPropagation();
    var self = $(this);
    var id = $(this).attr("id");

    self.hide();
    var value = $(this).html();
    self.parent('p').append('<input type="text" id="input-' + id + '" value="' + value + '">');

    $(document).on("click", 'body', function (e) {
        e.stopPropagation();
        $(document).mouseup(function () {
            if (!$(event.target).closest('#input-' + id).length) {
                var $input = $('#input-' + id);
                if ($input) {
                    var newValue = $input.val();
                    if (newValue) {
                        LocalStorage.set(id, newValue);
                        self.show().html(newValue);
                        $input.remove();
                    }
                }
            }
        });
    });
});

$(document).on("click", "#friend_btn", function () {
    $('#friend_btn').removeClass('button_blue').addClass('button_white');
    $('#me_btn').removeClass('button_white').addClass('button_blue');
    $('#home_page').hide();
    $('#friends_page').show();
});
$(document).on("click", "#me_btn", function () {
    $('#me_btn').removeClass('button_blue').addClass('button_white');
    $('#friend_btn').removeClass('button_white').addClass('button_blue');
    $('#friends_page').hide();
    $('#home_page').show();
});

$(document).on("click", "#user_interests_new_button", function () {
    addInterest();
});
$(document).on("click", ".btn_int", function () {
    removeInterest($(this));
});
