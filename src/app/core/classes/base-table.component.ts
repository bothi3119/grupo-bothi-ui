import { inject, Directive, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTableQueryParams } from 'ng-zorro-antd/table';

export interface PagyInfo {
  page_size: number;
  page_index: number;
  total: number;
  page_start: number;
  page_end: number;
  pages_total: number;
}

export interface PaginatedResponse<T> {
  info: PagyInfo;
  results: T[];
}

@Directive()
export abstract class BaseTableComponent<T, F = any> {
  data: T[] = [];
  loading = false;
  error: string | null = null;
  pageSize = 10;
  pageIndex = 1;
  total = 0;
  filters: F | null = null;
  sort: { key: string; direction: 'ascend' | 'descend' } | null = null;
  searchTerm = '';
  info: PagyInfo | null = null;
  @Output() filterItems = new EventEmitter<any>();

  onQueryParamsChange(params: NzTableQueryParams): void {
    this.pageSize = params.pageSize;
    this.pageIndex = params.pageIndex;
  }

  pageIndexChange(pageIndex: number): void {
    this.filterItems.emit({ pageIndex });
  }

  pageSizeChange(pageSize: number): void {
    this.filterItems.emit({ pageSize });
  }
}
