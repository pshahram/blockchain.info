
$.fn.center = function () {
    this.css("top", Math.max(( $(window).height() - this.height() ) / 2+$(window).scrollTop(), 10) + "px");
    this.css("left", Math.max(( $(window).width() - this.width() ) / 2+$(window).scrollLeft(), 10) + "px");
    return this;
};

$(window).resize(function() {
    $('.modal:visible').center();
});

function showDepositModal(address, method, title, howitworks) {
    loadScript(resource + 'wallet/bootstrap.min.js', function () {

        $('#deposit-modal').remove();

        if ($('#deposit-modal').length == 0)
            $('body').append('<div id="deposit-modal" class="modal hide" style="width:100%;max-width:700px;"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">×</button><span style="float:right;padding-top:5px;padding-right:10px;">Have Questions? Read <a href="'+howitworks+'" id="how-it-works" target="new">How It Works</a></span><h3>'+title+'</h3></div><div class="modal-body" style="overflow-y:hidden;"><iframe id="deposit-frame" border="0" style="overflow-y:auto;border-style:none;width:100%;height:400px"></iframe></div><div class="modal-footer btn-group">Deposit Bitcoin into address <b>'+address+'</b> <a class="btn btn-secondary">Close</a></div></div>');

        var modal = $('#deposit-modal');

        modal.modal({
            keyboard: true,
            backdrop: "static",
            show: true
        });

        modal.find('.btn.btn-primary').unbind().click(function() {
            modal.modal('hide');
        });

        modal.find('.btn.btn-secondary').unbind().click(function() {
            modal.modal('hide');
        });

        //Center
        modal.center();

        try {
            if (guid != null && sharedKey != null) {
                $('#deposit-frame').attr('src', '/deposit?address='+address+'&ptype='+method+'&guid='+guid+'&sharedKey='+sharedKey);
                return;
            }
        } catch (e) { }

        $('#deposit-frame').attr('src', '/deposit?address='+address+'&ptype='+method);
    });
}