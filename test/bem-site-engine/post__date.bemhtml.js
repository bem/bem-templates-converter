block('post').elem('date')(

    match(function () { return !this.ctx.createDate && !this.ctx.editDate; })(
        def()(false)),

    content()(function () {
        var ctx = this.ctx,
            actionType = ctx.editDate ? 'editDate' : 'createDate';

        function format(postDate) {
            var date = new Date();
            date.setTime(postDate);

            var d = date.getDate(),
                m = date.getMonth(),
                y = date.getFullYear();

            return d + ' ' + BEM.I18N('post', 'month' + m) + ' ' + y;
        }

        return [
            BEM.I18N('post', actionType),
            ' ',
            format(ctx[actionType])
        ];
    })
);
