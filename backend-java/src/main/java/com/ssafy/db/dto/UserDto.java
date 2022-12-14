package com.ssafy.db.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class UserDto {
    private String email;
    private String userId;
    private String name;

    @Builder
    public UserDto(String email, String name){
        this.email = email;
        this.name = name;
    }
}
