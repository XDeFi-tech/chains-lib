# XDEFI Chains

### Fallback datasource
Set first incoming datasource as default. If it fails `${attempts}` times, try next one. If last datasource fails, starts from first one again.
```typescript
const provider = new EvmProvider(
  new FallbackDataSource(
    manifest,
    { attempts: 3 },
    new EvmProvider.dataSourceList.IndexerDataSource(manifest),
    new EvmProvider.dataSourceList.ChainDataSource(manifest)
  )
);
```
