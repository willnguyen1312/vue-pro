<script setup lang="ts">
import { computed, ref } from 'vue'
import { onKeyStroke } from '@vueuse/core'

const matchCount = ref(0)
const lastEvent = ref<KeyboardEvent | null>(null)

const isShiftA = (event: KeyboardEvent): boolean =>
  event.shiftKey && event.key.toLowerCase() === 'a'

const formatCombo = (event: KeyboardEvent): string => {
  const modifiers: string[] = []
  if (event.ctrlKey) modifiers.push('Ctrl')
  if (event.shiftKey) modifiers.push('Shift')
  if (event.altKey) modifiers.push('Alt')
  if (event.metaKey) modifiers.push('Meta')
  return [...modifiers, event.key.toUpperCase()].join(' + ')
}

const hasMatch = computed(() => matchCount.value > 0)
const lastCombo = computed(() => (lastEvent.value ? formatCombo(lastEvent.value) : '—'))

onKeyStroke(isShiftA, (event) => {
  event.preventDefault()
  matchCount.value += 1
  lastEvent.value = event
})
</script>

<template>
  <section class="keystroke">
    <h1>onKeyStroke — custom key predicate</h1>

    <p class="hint">
      Press <kbd>Shift</kbd> + <kbd>A</kbd> anywhere on the page. Every other key is filtered out by
      the predicate.
    </p>

    <pre class="snippet"><code>onKeyStroke(
  e =&gt; e.shiftKey &amp;&amp; e.key.toLowerCase() === 'a',
  () =&gt; { /* fires only for Shift + A */ },
)</code></pre>

    <div class="panel" :class="{ 'panel--match': hasMatch }">
      <p class="label">Last match</p>
      <output
        :key="matchCount"
        class="combo"
        data-test="last-combo"
        aria-live="polite"
      >{{ lastCombo }}</output>
      <p class="count">Matches: <span data-test="match-count">{{ matchCount }}</span></p>
    </div>
  </section>
</template>

<style scoped>
.keystroke {
  max-width: 40rem;
  margin: 0 auto;
  padding: 2rem 1rem;
}

h1 {
  font-size: 1.6rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.hint {
  color: #555;
  margin-bottom: 1rem;
}

kbd {
  display: inline-block;
  padding: 0.1rem 0.45rem;
  border: 1px solid #cbd5e1;
  border-bottom-width: 2px;
  border-radius: 0.35rem;
  background: #f8fafc;
  font-family: ui-monospace, monospace;
  font-size: 0.85em;
}

.snippet {
  padding: 1rem;
  border-radius: 0.5rem;
  background: #0f172a;
  color: #e2e8f0;
  overflow-x: auto;
  font-size: 0.85rem;
  line-height: 1.5;
}

.panel {
  margin-top: 1.5rem;
  padding: 1.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  text-align: center;
  transition: border-color 0.2s ease, background-color 0.2s ease;
}

.panel--match {
  border-color: #22c55e;
  background: #f0fdf4;
}

.label {
  margin: 0 0 0.5rem;
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #64748b;
}

.combo {
  display: block;
  font-family: ui-monospace, monospace;
  font-size: 2rem;
  font-weight: 700;
  color: #0f172a;
  animation: flash 0.6s ease;
}

.count {
  margin: 0.75rem 0 0;
  color: #475569;
}

@keyframes flash {
  from {
    transform: scale(1.15);
    color: #16a34a;
  }
  to {
    transform: scale(1);
  }
}
</style>
