block('my-block').content()(function() {
    return this.ctx.content.replace(/regexp/g, '');
})
