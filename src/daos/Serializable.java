package daos;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectMapper.DefaultTyping;

public interface Serializable<T> {
	
	default void saveToJson(String fileName, T values) {
		ObjectMapper mapper = new ObjectMapper();
		mapper.enableDefaultTyping(DefaultTyping.NON_FINAL);
		
		try {
			mapper.writerWithDefaultPrettyPrinter().writeValue(new File(fileName), values);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	default T loadFromJson(String fileName, T values) {
		try {
			ObjectMapper mapper = new ObjectMapper();
			mapper.enableDefaultTyping(DefaultTyping.NON_FINAL);
			InputStream stream = new FileInputStream(new File(fileName));
			TypeReference<T> typeReference = new TypeReference<T>() {};
			
			T t = mapper.readValue(stream, typeReference);
			stream.close();
			return t;
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

}
