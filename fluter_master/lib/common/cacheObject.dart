import 'dart:collection';
import 'package:dio/dio.dart';
import 'package:fluter_master/common/global.dart';

class CacheObject {
  CacheObject(this.response)
    :timeStamp = DateTime.now().millisecondsSinceEpoch;
  Response response;
  int timeStamp;

  @override
  bool operator ==(other) {
    return response.hashCode == other.hashCode;
  }
  
  @override
  int get hashCode => response.realUri.hashCode;
}

class NetCache extends Interceptor {
  // 为确保迭代器顺序和对象插入时间一致顺序一致，使用LinkedHashMap
  var cache = LinkedHashMap<String, CacheObject>();

  @override
  Future onRequest(RequestOptions options) async {
    // TODO: implement onRequest
    if (!Global.profile.cache.enable) return options;
    // refresh 标记是否是"下拉刷新"
    bool refresh = options.extra["refresh"] == true;
    // 如果下拉刷新，先删除相关缓存
    if (refresh) {
      if (options.extra["list"] == true) {
        // 若是列表，则只要url中包含当前path的缓存全部删除
        cache.removeWhere((key, value) => key.contains(options.path));
      } else {
        // 如果不是列表，则只删除uri相同的缓存
        delete(options.uri.toString());
      }
    }
    return super.onRequest(options);
  }
  
  void delete(String key) {}
}
