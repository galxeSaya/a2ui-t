import type {
  Bar,
  HistoryMetadata,
  LibrarySymbolInfo,
  PeriodParams,
  ResolutionString,
  SubscribeBarsCallback,
} from '../../../charting_library/datafeed-api'

export interface IDataPulseProvider {
  subscribeBars(
    symbolInfo: LibrarySymbolInfo,
    resolution: ResolutionString,
    newDataCallback: SubscribeBarsCallback,
    listenerGuid: string
  ): void
  unsubscribeBars(listenerGuid: string): void
}

export interface GetBarsResult {
  bars: Bar[]
  meta: HistoryMetadata
}

export interface IHistoryProvider {
  getBars(
    symbolInfo: LibrarySymbolInfo,
    resolution: ResolutionString,
    periodParams: PeriodParams
  ): Promise<GetBarsResult>
}
