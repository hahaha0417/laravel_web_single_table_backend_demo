! function($) {
    "use strict";

    function clearMenus() {
        getParent($(toggle)).removeClass("open")
    }

    function getParent($this) {
        var $parent, selector = $this.attr("data-target");
        return selector || (selector = $this.attr("href"), selector = selector && selector.replace(/.*(?=#[^\s]*$)/, "")), $parent = $(selector), $parent.length || ($parent = $this.parent()), $parent
    }
    var toggle = "[data-toggle=dropdown]",
        Dropdown = function(element) {
            var $el = $(element).on("click.dropdown.data-api", this.toggle);
            $("html").on("click.dropdown.data-api", function() {
                $el.parent().removeClass("open")
            })
        };
    Dropdown.prototype = {
        constructor: Dropdown,
        toggle: function() {
            var $parent, isActive, $this = $(this);
            if (!$this.is(".disabled, :disabled")) return $parent = getParent($this), isActive = $parent.hasClass("open"), clearMenus(), isActive || ($parent.toggleClass("open"), $this.focus()), !1
        },
        keydown: function(e) {
            var $this, $items, $parent, isActive, index;
            if (/(38|40|27)/.test(e.keyCode) && ($this = $(this), e.preventDefault(), e.stopPropagation(), !$this.is(".disabled, :disabled"))) {
                if ($parent = getParent($this), isActive = $parent.hasClass("open"), !isActive || isActive && 27 == e.keyCode) return $this.click();
                $items = $("[role=menu] li:not(.divider) a", $parent), $items.length && (index = $items.index($items.filter(":focus")), 38 == e.keyCode && index > 0 && index--, 40 == e.keyCode && index < $items.length - 1 && index++, ~index || (index = 0), $items.eq(index).focus())
            }
        }
    }, $.fn.dropdown = function(option) {
        return this.each(function() {
            var $this = $(this),
                data = $this.data("dropdown");
            data || $this.data("dropdown", data = new Dropdown(this)), "string" == typeof option && data[option].call($this)
        })
    }, $.fn.dropdown.Constructor = Dropdown, $(function() {
        "createTouch" in document || $("html").on("click.dropdown.data-api touchstart.dropdown.data-api", clearMenus), $("body").on("click.dropdown touchstart.dropdown.data-api", ".dropdown", function(e) {
            e.stopPropagation()
        }).on("click.dropdown.data-api touchstart.dropdown.data-api", toggle, Dropdown.prototype.toggle).on("keydown.dropdown.data-api touchstart.dropdown.data-api", toggle + ", [role=menu]", Dropdown.prototype.keydown)
    })
}(window.jQuery), ! function($) {
    "use strict";
    var Modal = function(element, options) {
        this.options = options, this.$element = $(element).delegate('[data-dismiss="modal"]', "click.dismiss.modal", $.proxy(this.hide, this)), this.options.remote && this.$element.find(".modal-body").load(this.options.remote)
    };
    Modal.prototype = {
        constructor: Modal,
        toggle: function() {
            return this[this.isShown ? "hide" : "show"]()
        },
        show: function() {
            var that = this,
                e = $.Event("show");
            this.$element.trigger(e), this.isShown || e.isDefaultPrevented() || ($("body").addClass("modal-open"), this.isShown = !0, this.escape(), this.backdrop(function() {
                var transition = $.support.transition && that.$element.hasClass("fade");
                that.$element.parent().length || that.$element.appendTo(document.body), that.$element.show(), transition && that.$element[0].offsetWidth, that.$element.addClass("in").attr("aria-hidden", !1).focus(), that.enforceFocus(), transition ? that.$element.one($.support.transition.end, function() {
                    that.$element.trigger("shown")
                }) : that.$element.trigger("shown")
            }))
        },
        hide: function(e) {
            e && e.preventDefault();
            e = $.Event("hide"), this.$element.trigger(e), this.isShown && !e.isDefaultPrevented() && (this.isShown = !1, $("body").removeClass("modal-open"), this.escape(), $(document).off("focusin.modal"), this.$element.removeClass("in").attr("aria-hidden", !0), $.support.transition && this.$element.hasClass("fade") ? this.hideWithTransition() : this.hideModal())
        },
        enforceFocus: function() {
            var that = this;
            $(document).on("focusin.modal", function(e) {
                that.$element[0] === e.target || that.$element.has(e.target).length || that.$element.focus()
            })
        },
        escape: function() {
            var that = this;
            this.isShown && this.options.keyboard ? this.$element.on("keyup.dismiss.modal", function(e) {
                27 == e.which && that.hide()
            }) : this.isShown || this.$element.off("keyup.dismiss.modal")
        },
        hideWithTransition: function() {
            var that = this,
                timeout = setTimeout(function() {
                    that.$element.off($.support.transition.end), that.hideModal()
                }, 500);
            this.$element.one($.support.transition.end, function() {
                clearTimeout(timeout), that.hideModal()
            })
        },
        hideModal: function() {
            this.$element.hide().trigger("hidden"), this.backdrop()
        },
        removeBackdrop: function() {
            this.$backdrop.remove(), this.$backdrop = null
        },
        backdrop: function(callback) {
            var animate = this.$element.hasClass("fade") ? "fade" : "";
            if (this.isShown && this.options.backdrop) {
                var doAnimate = $.support.transition && animate;
                this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />').appendTo(document.body), "static" != this.options.backdrop && this.$backdrop.click($.proxy(this.hide, this)), doAnimate && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), doAnimate ? this.$backdrop.one($.support.transition.end, callback) : callback()
            } else !this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"), $.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one($.support.transition.end, $.proxy(this.removeBackdrop, this)) : this.removeBackdrop()) : callback && callback()
        }
    }, $.fn.modal = function(option) {
        return this.each(function() {
            var $this = $(this),
                data = $this.data("modal"),
                options = $.extend({}, $.fn.modal.defaults, $this.data(), "object" == typeof option && option);
            data || $this.data("modal", data = new Modal(this, options)), "string" == typeof option ? data[option]() : options.show && data.show()
        })
    }, $.fn.modal.defaults = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    }, $.fn.modal.Constructor = Modal, $(function() {
        $("body").on("click.modal.data-api", '[data-toggle="modal"]', function(e) {
            var $this = $(this),
                href = $this.attr("href"),
                $target = $($this.attr("data-target") || href && href.replace(/.*(?=#[^\s]+$)/, "")),
                option = $target.data("modal") ? "toggle" : $.extend({
                    remote: !/#/.test(href) && href
                }, $target.data(), $this.data());
            e.preventDefault(), $target.modal(option).one("hide", function() {
                $this.focus()
            })
        })
    })
}(window.jQuery);