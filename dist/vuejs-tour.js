import { defineComponent as D, ref as y, reactive as M, computed as s, onMounted as H, openBlock as c, createElementBlock as S, Fragment as z, createElementVNode as l, normalizeStyle as R, renderSlot as _, normalizeProps as w, guardReactiveProps as A, withModifiers as x, toDisplayString as C, createCommentVNode as k } from "vue";
import { createPopper as F } from "nanopop";
import G from "jump.js";
const J = {
  id: "vjt-tooltip",
  role: "tooltip",
  "data-arrow": "r",
  "data-hidden": ""
}, K = ["innerHTML"], O = { class: "vjt-actions" }, Q = ["textContent"], U = ["textContent"], W = ["textContent"], X = {
  key: 0,
  id: "vjt-arrow"
}, et = /* @__PURE__ */ D({
  __name: "VTour",
  props: {
    name: {},
    steps: {},
    backdrop: { type: Boolean },
    autoStart: { type: Boolean },
    startDelay: {},
    highlight: { type: Boolean },
    margin: {},
    buttonLabels: {},
    saveToLocalStorage: {},
    hideSkip: { type: Boolean },
    hideArrow: { type: Boolean },
    noScroll: { type: Boolean }
  },
  emits: ["onTourStart", "onTourEnd", "onTourStep"],
  setup(B, { expose: q, emit: E }) {
    const d = y(void 0), a = y(void 0), t = M({
      currentStep: 0,
      lastStep: 0,
      nextStep: 1,
      getCurrentStep: s(() => e.steps[t.currentStep]),
      getLastStep: s(() => e.steps[t.lastStep]),
      getNextStep: s(() => e.steps[t.nextStep])
    }), e = B, g = E;
    q({
      startTour: h,
      nextStep: v,
      lastStep: f,
      endTour: i,
      stopTour: m,
      goToStep: I,
      resetTour: P
    });
    const j = s(() => {
      var o, n;
      return t.currentStep === e.steps.length - 1 ? ((o = e.buttonLabels) == null ? void 0 : o.done) || "Done" : ((n = e.buttonLabels) == null ? void 0 : n.next) || "Next";
    }), T = y(b(".vjt-highlight") ? b(".vjt-highlight") : "");
    function h() {
      localStorage.getItem("vjt-" + (e.name || "default")) !== "true" && (e.saveToLocalStorage === "step" ? t.currentStep = parseInt(localStorage.getItem("vjt-" + (e.name || "default")) || "0") : t.currentStep = 0, setTimeout(async () => {
        await u(t.currentStep), d.value || (d.value = F(document.querySelector(`${t.getCurrentStep.target}`), a.value, {
          position: t.getCurrentStep.placement || "right",
          margin: e.margin || (e.highlight || t.getCurrentStep.highlight ? 14 : 8)
        })), p(), g("onTourStart");
      }, e.startDelay));
    }
    function m() {
      (e.backdrop || t.getLastStep.backdrop) && document.querySelector("#vjt-backdrop").setAttribute("data-hidden", ""), (e.highlight || t.getLastStep.highlight) && document.querySelectorAll(".vjt-highlight").forEach((o) => o.classList.remove("vjt-highlight")), a.value.setAttribute("data-hidden", "");
    }
    function P(o) {
      m(), t.currentStep = 0, t.lastStep = 0, t.nextStep = 1, localStorage.removeItem("vjt-" + (e.name || "default")), o && h();
    }
    async function v() {
      if (await u(t.nextStep), t.lastStep = t.currentStep, t.currentStep++, t.currentStep > e.steps.length - 1) {
        i();
        return;
      }
      t.nextStep = t.currentStep++, p();
    }
    async function f() {
      if (await u(t.lastStep), t.currentStep = t.lastStep, t.lastStep--, t.lastStep === -1 && (t.lastStep = 0), t.currentStep < 0) {
        i();
        return;
      }
      t.nextStep = t.currentStep++, p();
    }
    function i() {
      m(), e.saveToLocalStorage !== "never" && localStorage.setItem("vjt-" + (e.name || "default"), "true"), g("onTourEnd");
    }
    function I(o) {
      u(o), t.currentStep = o, t.lastStep = o - 1, t.lastStep === -1 && (t.lastStep = 0), t.nextStep = o + 1, p();
    }
    async function u(o) {
      var n, r;
      await ((r = (n = e.steps[o]).onBefore) == null ? void 0 : r.call(n));
    }
    async function p() {
      var o, n;
      await new Promise((r) => {
        N(), V(), a.value.setAttribute("data-hidden", ""), !e.noScroll && !t.getCurrentStep.noScroll ? G(document.querySelector(`${t.getCurrentStep.target}`), {
          duration: 500,
          offset: -100,
          callback: () => {
            r();
          }
        }) : r();
      }), a.value.removeAttribute("data-hidden"), a.value.setAttribute("data-arrow", d.value.update({
        reference: document.querySelector(`${t.getCurrentStep.target}`),
        position: t.getCurrentStep.placement || "right"
      }) || "right"), e.saveToLocalStorage === "step" && localStorage.setItem("vjt-" + (e.name || "default"), t.currentStep.toString()), await ((n = (o = t.getCurrentStep).onAfter) == null ? void 0 : n.call(o)), g("onTourStep");
    }
    function N() {
      document.querySelectorAll(".vjt-highlight").forEach((o) => o.classList.remove("vjt-highlight")), !(!e.highlight && !t.getCurrentStep.highlight) && (document.querySelector(`${t.getCurrentStep.target}`).classList.add("vjt-highlight"), T.value = b(".vjt-highlight"));
    }
    function V() {
      e.backdrop || t.getCurrentStep.backdrop ? document.querySelector("#vjt-backdrop").removeAttribute("data-hidden") : document.querySelector("#vjt-backdrop").setAttribute("data-hidden", "");
    }
    H(() => {
      a.value = document.querySelector("#vjt-tooltip"), e.autoStart && h();
    });
    function b(o) {
      const n = document.querySelector(o);
      if (!n) return "";
      const r = n.getBoundingClientRect();
      return `polygon(
    0% 0%,
    0% 100%,
    ${r.left}px 100%,
    ${r.left}px ${r.top}px,
    ${r.right}px ${r.top}px,
    ${r.right}px ${r.bottom}px,
    ${r.left}px ${r.bottom}px,
    ${r.left}px 100%,
    100% 100%,
    100% 0%
  )`;
    }
    return (o, n) => (c(), S(z, null, [
      l("div", {
        id: "vjt-backdrop",
        "data-hidden": "",
        style: R("clip-path: " + T.value)
      }, null, 4),
      l("div", J, [
        _(o.$slots, "content", w(A({ _CurrentStep: t })), () => {
          var r;
          return [
            l("div", {
              innerHTML: (r = t.getCurrentStep) == null ? void 0 : r.content
            }, null, 8, K)
          ];
        }),
        _(o.$slots, "actions", w(A({ lastStep: f, nextStep: v, endTour: i, _CurrentStep: t, getNextLabel: j.value, props: e })), () => {
          var r, L;
          return [
            l("div", O, [
              t.lastStep < t.currentStep ? (c(), S("button", {
                key: 0,
                type: "button",
                onClick: n[0] || (n[0] = x(($) => f(), ["prevent"])),
                textContent: C(((r = e.buttonLabels) == null ? void 0 : r.back) || "Back")
              }, null, 8, Q)) : k("", !0),
              e.hideSkip ? k("", !0) : (c(), S("button", {
                key: 1,
                type: "button",
                onClick: n[1] || (n[1] = x(($) => i(), ["prevent"])),
                textContent: C(((L = e.buttonLabels) == null ? void 0 : L.skip) || "Skip")
              }, null, 8, U)),
              l("button", {
                type: "button",
                onClick: n[2] || (n[2] = x(($) => v(), ["prevent"])),
                textContent: C(j.value)
              }, null, 8, W)
            ])
          ];
        }),
        e.hideArrow ? k("", !0) : (c(), S("div", X))
      ])
    ], 64));
  }
});
export {
  et as VTour
};
